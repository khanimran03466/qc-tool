import Header from "@/components/Header";
import "@/scss/style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "DJINN.AI QC Tool",
  description: "Quality Control Tool for Document Processing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
