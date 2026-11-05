import { jsPDF } from "jspdf";
import { Data, Quote, money, totals } from "./model";
export function exportPDF(d: Data, q: Quote, brief = false) {
  const e = d.enquiries.find((e) => e.id === q.enquiryId)!;
  const pdf = new jsPDF();
  let y = 25;
  const line = (s: string, size = 11) => {
    pdf.setFontSize(size);
    const rows = pdf.splitTextToSize(s, 170);
    if (y + rows.length * 7 > 270) {
      pdf.addPage();
      y = 25;
    }
    pdf.text(rows, 20, y);
    y += rows.length * 7 + 3;
  };
  pdf.setTextColor(81, 69, 67);
  line("KPM OPULENCE", 24);
  line(
    brief
      ? "EVENT BRIEF / DEMONSTRATION"
      : "PERSONALISED QUOTATION / DEMONSTRATION",
    12,
  );
  line(q.id + "  |  Version " + q.version);
  line(e.config.name + " / " + e.config.email);
  line(e.config.occasion + " / " + e.config.style, 16);
  line(e.config.date + " at " + e.config.time + " / " + e.config.location);
  line("Guests: " + e.config.guests + " / " + e.config.venue);
  if (e.config.officialPackage)
    line(
      "KPM package reference: " +
        e.config.officialPackage +
        " (official price to be confirmed)",
    );
  if (e.config.extras?.length)
    line("Requested extras (quote-only): " + e.config.extras.join(", "));
  line(
    "Flowers: " +
      (e.config.flowers ? e.config.flowerType : "No") +
      " | Balloons: " +
      (e.config.balloons ? e.config.balloonType : "No") +
      " | Candles: " +
      (e.config.candles ? e.config.candleType : "No"),
  );
  if (brief) {
    line("Requirements: " + e.config.notes);
    line("Internal notes: " + e.notes);
  } else {
    q.items.forEach((i) =>
      line(i.name + "  x" + i.qty + "    " + money(i.qty * i.price)),
    );
    line(
      "Additional charges: " +
        money(q.charge) +
        " / Discount: " +
        money(q.discount),
    );
    line("Tax: " + q.tax + "%");
    const total = totals(q.items, q.charge, q.discount, q.tax);
    line("TOTAL " + money(total), 20);
    line(
      "Deposit (" +
        q.deposit +
        "%): " +
        money(Math.round((total * q.deposit) / 100)),
    );
    line("Valid until " + q.validUntil);
    line(q.terms);
  }
  line("Illustrative prices only. Not an official KPM Opulence offer.");
  line("Interactive concept by paceIT / paceit.co.za");
  pdf.save(q.id + (brief ? "-brief" : "") + ".pdf");
}
