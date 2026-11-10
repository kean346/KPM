import { money } from "../src/lib/model";
import { test, expect } from "@playwright/test";
test("customer brief through quote PDF and confirmed calendar booking", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "KPM Opulence. Your moment, beautifully imagined.",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Design Your Experience", exact: true })
    .click();
  await page.getByRole("button", { name: "Load Example", exact: true }).click();
  for (let i = 0; i < 5; i++)
    await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByText(money(390000), { exact: true }).first(),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Request My Personalised Quote" })
    .click();
  await expect(page).toHaveURL(/enquiry\/success/);
  await page.getByRole("link", { name: "View in Studio Manager" }).click();
  await expect(
    page.getByText("2026-11-21 · 18:30", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Create / open quotation" }).click();
  await page
    .getByRole("button", { name: "Edit quotation", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByLabel("Unit price (R)")
    .first()
    .fill("2750");
  await page
    .getByRole("button", { name: "Save quotation", exact: true })
    .click();
  await page.evaluate(() => {
    const original = URL.createObjectURL.bind(URL);
    URL.createObjectURL = (blob) => {
      if (blob instanceof Blob && blob.type === "application/pdf")
        (window as unknown as { pdfBytes: Promise<number[]> }).pdfBytes = blob
          .arrayBuffer()
          .then((bytes) => Array.from(new Uint8Array(bytes)));
      return original(blob);
    };
  });
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download PDF", exact: true }).click();
  const downloaded = await download;
  expect(downloaded.suggestedFilename()).toMatch(/\.pdf$/);
  try {
    await downloaded.saveAs("../outputs/example-quotation.pdf");
  } catch (error) {
    if (process.env.KPM_SANDBOX_DOWNLOAD_FALLBACK !== "1") throw error;
    test.info().annotations.push({
      type: "environment limitation",
      description:
        "Sandbox cancels native browser downloads; exact emitted PDF bytes verified instead.",
    });
    const bytes = await page.evaluate(
      () => (window as unknown as { pdfBytes: Promise<number[]> }).pdfBytes,
    );
    const { writeFile } = await import("node:fs/promises");
    await writeFile("../outputs/example-quotation.pdf", Buffer.from(bytes));
  }
  const { readFile } = await import("node:fs/promises");
  const bytes = await readFile("../outputs/example-quotation.pdf");
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(1000);
  await page.getByRole("button", { name: "Mark accepted" }).click();
  await page.getByRole("button", { name: "Confirm booking" }).click();
  await expect(page).toHaveURL(/admin\/calendar/);
  await page
    .getByRole("button", {
      name: "2026-11-21, 1 confirmed events",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("2026-11-21 · 18:30 · Pretoria, Gauteng"),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "2026-11-21, 1 confirmed events",
      exact: true,
    }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("mobile layouts and gallery dialog keyboard dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of [
    "/",
    "/collections",
    "/gallery",
    "/studio",
    "/admin",
    "/admin/calendar",
  ]) {
    await page.goto(route);
    await expect(page.locator("#main")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/gallery");
  await page.getByRole("button", { name: /A garden kind of romance/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("validation, catalogue updates and confirmed reset", async ({ page }) => {
  await page.goto("/studio");
  await page.getByRole("button", { name: "About you", exact: false }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.locator("#email")).toHaveAttribute("aria-invalid", "true");
  await page.getByRole("button", { name: "Load Example", exact: true }).click();
  await page.goto("/admin/packages");
  await page.getByLabel("Illustrative price (R)").first().fill("3000");
  await page
    .getByRole("button", { name: "Save catalogue", exact: true })
    .click();
  await page.goto("/studio");
  await expect(page.locator(".estimate strong")).toContainText(money(440000));
  await page.goto("/admin/settings");
  await page.getByRole("button", { name: "Reset Demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Keep my progress" })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Reset Demo", exact: true }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Reset Demo", exact: true })
    .click();
  await expect(page).toHaveURL("/");
  await page.goto("/studio");
  await expect(page.locator(".estimate strong")).toContainText(money(390000));
});

test("homepage motion survives navigation and reduced motion stays readable", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /play background|pause background/i })).toHaveCount(0);
  const video = page.locator(".cinema-background video.active");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentSrc)).toMatch(/desktop-hd\.mp4$/);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  const card = page.locator(".collection-card-reveal").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS("opacity", "1");
  await card.getByRole("link").click();
  await expect(page).toHaveURL(/collections\/romantic-proposals/);
  await page.getByRole("banner").locator(".brand").click();
  await expect(page).toHaveURL("/");
  await page.locator(".collection-card-reveal").first().scrollIntoViewIfNeeded();
  await expect(page.locator(".collection-card-reveal").first()).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  // The hero is offscreen after scrolling to the collection cards.
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await expect(card).toHaveCSS("opacity", "1");
});

test("phone loads a single lightweight film and frames settle side by side", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const media: string[] = [];
  page.on("request", request => { if (request.url().endsWith(".mp4")) media.push(request.url()); });
  await page.goto("/");
  await expect(page.getByRole("button", { name: /play background|pause background/i })).toHaveCount(0);
  const video = page.locator(".cinema-background video.active");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  expect(media.every(url => url.endsWith("-phone.mp4"))).toBe(true);
  expect(new Set(media).size).toBe(1);
  const frames = page.locator(".photo-stack .gallery-card");
  await page.evaluate(() => {
    const stack = document.querySelector(".photo-stack")!;
    window.scrollTo({ top: stack.getBoundingClientRect().top + scrollY - innerHeight * 0.22, behavior: "instant" });
  });
  await expect(page.locator(".photo-stack")).toHaveClass(/frames-in-view/);
  await expect.poll(() => frames.first().evaluate(el => getComputedStyle(el).animationName)).toBe("frame-water-rise");
  const initialTransform = await frames.first().evaluate(el => getComputedStyle(el).transform);
  await expect.poll(() => frames.first().evaluate(el => getComputedStyle(el).transform)).not.toBe(initialTransform);
  await expect.poll(async () => {
    const boxes = await frames.evaluateAll(elements => elements.map(el => el.getBoundingClientRect().top));
    return Math.max(...boxes) - Math.min(...boxes);
  }).toBeLessThan(3);
  await frames.first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
});

test("top Event Studio button works on desktop and phone", async ({ page }) => {
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const entry = page.getByRole("banner").getByRole("link", { name: "Event Studio", exact: true });
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page).toHaveURL(/\/studio$/);
    await expect(page.getByRole("button", { name: "Load Example", exact: true })).toBeVisible();
  }
});

test("desktop film keeps playing and rotates with system reduced motion enabled", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const video = page.locator(".cinema-background video.active");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.videoWidth)).toBe(1920);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0.2);
  const firstSource = await video.evaluate((el: HTMLVideoElement) => el.currentSrc);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentSrc), { timeout: 15000 }).not.toBe(firstSource);
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => !el.paused && el.currentTime > 0)).toBe(true);
  await expect(page.getByRole("button", { name: /play background|pause background/i })).toHaveCount(0);
});
