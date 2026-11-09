import { FileSpreadsheet, ShieldCheck } from "lucide-react";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { FinoraLogo } from "../ui/FinoraLogo";

const FEATURES = [
  {
    icon: LuChartNoAxesCombined,
    title: "Track your spending",
    description: "See your expenses in easy charts.",
  },
  {
    icon: FileSpreadsheet,
    title: "Export reports",
    description: "Download your data to Excel.",
  },
  {
    icon: ShieldCheck,
    title: "Keep it secure",
    description: "Your data is always safe.",
  },
];

const AuthShell = ({ title, subtitle, children, footer }) => {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.1fr_1.2fr]">
      {/* Left panel */}
      <aside className="left-section hidden flex-col justify-between p-12 lg:p-16 text-white lg:flex">
        <FinoraLogo theme="light" showSubtitle={true} size="lg" />

        <div className="my-auto py-10">
          <h2 className="font-display text-4xl lg:text-[44px] font-bold leading-[1.15] text-white tracking-tight">
            Know where <br />
            every <span className="text-[#FFB900]">rupee</span> goes.
          </h2>

          <p className="mt-4 text-base font-normal text-[#AFC3EA] leading-relaxed">
            Take control of your finances with <br />
            simple and smart tracking.
          </p>

          <div className="mt-10 space-y-6">
            {FEATURES.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#FFB900] shadow-sm backdrop-blur-xs">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm font-normal text-[#AFC3EA]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div />
      </aside>

      {/* Right panel */}
      <main className="flex items-center justify-center bg-white p-6 sm:p-10 lg:p-12">
        <div className="w-full max-w-[420px]">
          {/* Centered Finora Logo */}
          <div className="mb-6 flex justify-center">
            <FinoraLogo theme="dark" showSubtitle={false} size="lg" />
          </div>

          {/* Page Heading */}
          <h1 className="text-center font-display text-2xl sm:text-3xl font-bold text-[#0B2452]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mt-2 mb-8 text-center text-sm font-normal text-[#556987]">
            {subtitle}
          </p>

          {children}

          {footer}
        </div>
      </main>
    </div>
  );
};

export default AuthShell;
