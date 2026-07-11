
import { Navber } from "@/components/Navber";
import { Footer } from "@/components/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navber />
            <main >
                {children}
            </main>
            <Footer />
        </>
    );
}
