import { Dispatch, FormEvent, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "back"
  | "bank"
  | "bell"
  | "card"
  | "chart"
  | "chat"
  | "check"
  | "chevron"
  | "close"
  | "deposit"
  | "eye"
  | "expand"
  | "fund"
  | "lock"
  | "mail"
  | "menu"
  | "minimize"
  | "phone"
  | "repeat"
  | "search"
  | "shield"
  | "user";

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="m9 18 6-6-6-6M15 12H3" />,
  back: <path d="m15 18-6-6 6-6M9 12h12" />,
  bank: <path d="M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 18h18M12 3l9 4H3l9-4Z" />,
  bell: <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />,
  card: <path d="M3 6h18v12H3zM3 10h18M7 15h3" />,
  chart: <path d="M4 20V10m6 10V4m6 16v-7m4 7V7" />,
  chat: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  deposit: <path d="M4 7c0 2 16 2 16 0s-16-2-16 0Zm0 0v5c0 2 16 2 16 0V7m-16 5v5c0 2 16 2 16 0v-5" />,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
  expand: <path d="M8 3H3v5M16 3h5v5M8 21H3v-5m13 5h5v-5M3 8l6-6m12 6-6-6M3 16l6 6m12-6-6 6" />,
  fund: <path d="M5 20V9h4v11m2 0V4h4v16m2 0v-7h4v7M3 20h20" />,
  lock: <path d="M5 10h14v11H5zM8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />,
  mail: <path d="M3 5h18v14H3zM3 7l9 7 9-7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  minimize: <path d="M9 9H4V4m11 5h5V4M9 15H4v5m11-5h5v5M4 9l6-6m10 6-6-6M4 15l6 6m10-6-6 6" />,
  phone: <path d="M7 3h3l1 5-2 1a15 15 0 0 0 6 6l1-2 5 1v3c0 2-2 4-4 4A16 16 0 0 1 3 7c0-2 2-4 4-4Z" />,
  repeat: <path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  shield: <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Zm-3 9 2 2 4-5" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    >
      {paths[name]}
    </svg>
  );
}

type Product = {
  type: string;
  label: string;
  amount: string;
  number: string;
  icon: IconName;
  tone: string;
};

const MAX_RAINY_TOP_UP = 7250;
const PERSONAL_LOAN_EMI = 9250;
const PERSONAL_LOAN_OUTSTANDING = "₹2,04,000";
const PERSONAL_LOAN_REMAINING_INSTALLMENTS = 24;
const PERSONAL_LOAN_NEXT_DUE = "2 Nov 2026";
const PERSONAL_LOAN_RATE = "11.5% p.a.";

const allProducts: Product[] = [
  {
    type: "Savings account",
    label: "Available balance",
    amount: "₹ 1,20,430",
    number: "4821  ••••  ••••  1234",
    icon: "bank" as IconName,
    tone: "blue",
  },
  {
    type: "Fixed deposits",
    label: "Total invested",
    amount: "₹ 75,000",
    number: "2 active deposits",
    icon: "deposit" as IconName,
    tone: "gold",
  },
  {
    type: "Recurring deposit",
    label: "Current value",
    amount: "₹ 30,000",
    number: "₹3,000 monthly",
    icon: "repeat" as IconName,
    tone: "coral",
  },
  {
    type: "Mutual funds",
    label: "Current value",
    amount: "₹ 23,220",
    number: "3 active investments",
    icon: "fund" as IconName,
    tone: "violet",
  },
  {
    type: "Personal loan",
    label: "Outstanding balance",
    amount: `₹ ${PERSONAL_LOAN_OUTSTANDING.replace("₹", "").trim()}`,
    number: `${PERSONAL_LOAN_REMAINING_INSTALLMENTS} instalments remaining`,
    icon: "card",
    tone: "blue",
  },
  {
    type: "Insurance",
    label: "Total cover",
    amount: "₹ 10,00,000",
    number: "Family protection plan",
    icon: "shield",
    tone: "blue",
  },
];

type MockUser = {
  id: string;
  name: string;
  firstName: string;
  email: string;
  productCount: number;
  dateOfBirth: string;
  gender: string;
  mobile: string;
  mailingAddress: string;
};

const mockUsers: MockUser[] = [
  { id: "123456789", name: "Rajesh Harikrishnan", firstName: "Rajesh", email: "rajesh.harish@email.com", productCount: 4, dateOfBirth: "15 Mar 1998", gender: "Male", mobile: "+91 98765 43210", mailingAddress: "24, MG Road, Bengaluru – 560001" },
  { id: "222222222", name: "Meera Nair", firstName: "Meera", email: "meera.nair@email.com", productCount: 2, dateOfBirth: "22 Jul 1994", gender: "Female", mobile: "+91 98450 12345", mailingAddress: "18, Lake View Road, Kochi – 682016" },
  { id: "333333333", name: "Arjun Menon", firstName: "Arjun", email: "arjun.menon@email.com", productCount: 1, dateOfBirth: "08 Nov 1992", gender: "Male", mobile: "+91 98100 23456", mailingAddress: "42, Anna Salai, Chennai – 600002" },
  { id: "444444444", name: "Kavya Srinivasan", firstName: "Kavya", email: "kavya.s@email.com", productCount: 6, dateOfBirth: "03 Feb 1996", gender: "Female", mobile: "+91 98200 34567", mailingAddress: "7, Residency Road, Bengaluru – 560025" },
];

const profileItems = [
  { title: "Personal details", subtitle: "Name, contact, address", icon: "user" as IconName },
  { title: "Bank account details", subtitle: "Account number, IFSC, branch", icon: "bank" as IconName },
  { title: "KYC information", subtitle: "PAN, Aadhaar, other details", icon: "card" as IconName },
  { title: "Communication preferences", subtitle: "Alerts, statements, offers", icon: "mail" as IconName },
  { title: "Consent", subtitle: "Manage AI data access and product updates", icon: "shield" as IconName },
  { title: "Security settings", subtitle: "Passcode, biometrics and trusted devices", icon: "lock" as IconName },
  { title: "Chat history", subtitle: "Queries, AI traces and responses", icon: "repeat" as IconName },
  { title: "My pockets", subtitle: "Balances, goals and create a pocket", icon: "deposit" as IconName },
];

type Pocket = { name: string; balance: number; goal: number };

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <img alt="Equitas Small Finance Bank" src="/equitas-logo.png" />
    </div>
  );
}

function Login({ onAdmin, onLogin }: { onAdmin: () => void; onLogin: (user: MockUser) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(mockUsers[0].id);
  const [loginNotice, setLoginNotice] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const user = mockUsers.find((item) => item.id === customerId) ?? mockUsers[0];
    window.setTimeout(() => onLogin(user), 450);
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <div className="story-orb story-orb-one" />
        <div className="story-orb story-orb-two" />
        <Logo light />
        <div className="story-copy">
          <span className="eyebrow">Banking, made personal</span>
          <h1>Build a brighter financial tomorrow.</h1>
          <p>Track your money, grow your investments and reach your goals, all from one secure place.</p>
          <div className="story-benefits">
            <span><Icon name="shield" size={18} /> Secure banking</span>
            <span><Icon name="chart" size={18} /> Smarter insights</span>
            <span><Icon name="bank" size={18} /> One simple view</span>
          </div>
        </div>
        <p className="story-foot">Your money. Your goals. Your way.</p>
      </section>

      <section className="login-form-side">
        <div className="mobile-logo"><Logo /></div>
        <form className="login-card" onSubmit={submit}>
          <div className="login-heading">
            <span className="login-icon"><Icon name="lock" size={22} /></span>
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard.</p>
          </div>
          <label>
            <span>Customer ID or mobile number</span>
            <div className="field">
              <Icon name="user" size={19} />
              <input aria-label="Customer ID or mobile number" onChange={(event) => setCustomerId(event.target.value)} required value={customerId} />
            </div>
          </label>
          <label>
            <span>Password</span>
            <div className="field">
              <Icon name="lock" size={19} />
              <input aria-label="Password" defaultValue="securepass" required type={showPassword ? "text" : "password"} />
              <button aria-label="Show password" className="field-action" onClick={() => setShowPassword(!showPassword)} type="button">
                <Icon name="eye" size={18} />
              </button>
            </div>
          </label>
          <div className="form-options">
            <label className="remember"><input defaultChecked type="checkbox" /> Remember me</label>
            <button className="text-button" onClick={() => setLoginNotice("Password reset instructions sent to your registered contact.")} type="button">Forgot password?</button>
          </div>
          {loginNotice && <p className="login-notice"><Icon name="check" size={14} /> {loginNotice}</p>}
          <button className="primary-button" disabled={loading} type="submit">
            {loading ? "Signing in..." : "Sign in securely"}
            {!loading && <Icon name="arrow" size={18} />}
          </button>
          <p className="security-note"><Icon name="shield" size={16} /> 256-bit encrypted and securely protected</p>
          <button className="admin-entry-link" onClick={onAdmin} type="button">Admin</button>
        </form>
      </section>
    </main>
  );
}

function ProductCard({ index, items, onChange }: { index: number; items: Product[]; onChange: (index: number) => void }) {
  const product = items[index];
  const [balanceVisible, setBalanceVisible] = useState(true);
  const cardDetails = [
    { account: "Salary Account · •• 4821", activity: "₹85,000 salary credited yesterday", rate: "3.1% p.a." },
    { account: "2 active fixed deposits", activity: "₹50,000 matures on 15 Mar 2027", rate: "Up to 7.25%" },
    { account: "Recurring Deposit · •• 7624", activity: "Next instalment ₹3,000 on 5 Nov", rate: "6.8% p.a." },
    { account: "3 active mutual funds", activity: "Portfolio gained ₹1,860 this month", rate: "+8.2% returns" },
    { account: "Personal Loan · •• 3092", activity: `Next EMI ${formatRupees(PERSONAL_LOAN_EMI)} on 2 Nov`, rate: PERSONAL_LOAN_RATE },
    { account: "Family protection plan", activity: "Premium paid until 30 Jun 2027", rate: "Active" },
  ][index];

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setTimeout(() => onChange((index + 1) % items.length), 4500);
    return () => window.clearTimeout(timer);
  }, [index, items.length, onChange]);

  function changeFromWheel(delta: number) {
    if (Math.abs(delta) < 10) return;
    onChange((index + (delta > 0 ? 1 : -1) + items.length) % items.length);
  }

  return (
    <div className="balance-wrap" onWheel={(event) => changeFromWheel(event.deltaY || event.deltaX)}>
      <div className={`money-card money-card-${product.tone}`}>
        <div className="card-glow" />
        <div className="money-card-top">
          <div>
            <span className="card-label">{product.label}</span>
            <strong className={product.amount.length > 12 ? "long-value" : ""} title={product.amount}>
              {balanceVisible ? product.amount : "₹ ••••••••"}
            </strong>
          </div>
          <div className="money-card-actions">
            <button aria-label={balanceVisible ? "Hide account values" : "Show account values"} onClick={() => setBalanceVisible(!balanceVisible)} type="button">
              <Icon name="eye" size={18} />
            </button>
          </div>
        </div>
        <div className="money-card-account">{cardDetails.account}</div>
        <div className="money-card-divider" />
        <div className="money-card-foot">
          <span><Icon name="arrow" size={14} /> {balanceVisible ? cardDetails.activity : "Value hidden"}</span>
          <div className="money-card-foot-right">
            <strong>{balanceVisible ? cardDetails.rate : "••••"}</strong>
            <div aria-hidden="true" className="card-chip"><span /><span /><span /></div>
          </div>
        </div>
        <div aria-label="Choose linked product" className="carousel-dots">
          {items.map((item, dot) => (
            <button
              aria-label={`Show ${item.type}`}
              className={dot === index ? "active" : ""}
              key={item.type}
              onClick={() => onChange(dot)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type UpcomingActivity = {
  date: string;
  dateLabel: string;
  title: string;
  description: string;
  amount: string;
  activityType: string;
  icon: IconName;
  tone: string;
  incoming?: boolean;
};

const upcomingActivities: UpcomingActivity[] = [
  {
    date: "2026-10-25",
    dateLabel: "25 Oct",
    title: "Internet bill",
    description: "Home broadband · Savings account",
    amount: "₹1,499",
    activityType: "Savings account",
    icon: "card",
    tone: "blue",
  },
  {
    date: "2026-11-05",
    dateLabel: "05 Nov",
    title: "RD instalment",
    description: "Recurring deposit · Auto debit",
    amount: "₹3,000",
    activityType: "Recurring deposit",
    icon: "repeat",
    tone: "gold",
  },
  {
    date: "2026-11-10",
    dateLabel: "10 Nov",
    title: "Monthly SIP",
    description: "Mutual funds · Auto invest",
    amount: "₹2,000",
    activityType: "Mutual funds",
    icon: "fund",
    tone: "green",
  },
  {
    date: "2026-11-20",
    dateLabel: "20 Nov",
    title: "Electricity bill",
    description: "Utilities · Savings account",
    amount: "₹2,450",
    activityType: "Savings account",
    icon: "card",
    tone: "coral",
  },
  {
    date: "2026-12-05",
    dateLabel: "05 Dec",
    title: "RD instalment",
    description: "Recurring deposit · Auto debit",
    amount: "₹3,000",
    activityType: "Recurring deposit",
    icon: "repeat",
    tone: "gold",
  },
  {
    date: "2026-12-18",
    dateLabel: "18 Dec",
    title: "Water bill",
    description: "Utilities · Savings account",
    amount: "₹780",
    activityType: "Savings account",
    icon: "card",
    tone: "blue",
  },
  {
    date: "2027-01-05",
    dateLabel: "05 Jan",
    title: "RD instalment",
    description: "Recurring deposit · Auto debit",
    amount: "₹3,000",
    activityType: "Recurring deposit",
    icon: "repeat",
    tone: "gold",
  },
  {
    date: "2027-01-22",
    dateLabel: "22 Jan",
    title: "Insurance premium",
    description: "Family protection plan · Renewal",
    amount: "₹12,400",
    activityType: "Insurance",
    icon: "shield",
    tone: "violet",
  },
  {
    date: "2026-11-02",
    dateLabel: "02 Nov",
    title: "Personal loan EMI",
    description: "Loan payment · Auto debit",
    amount: formatRupees(PERSONAL_LOAN_EMI),
    activityType: "Personal loan",
    icon: "bank",
    tone: "blue",
  },
  {
    date: "2027-03-15",
    dateLabel: "15 Mar 2027",
    title: "Fixed deposit maturity",
    description: "FD001 · Maturity proceeds",
    amount: "+ ₹53,750",
    activityType: "Fixed deposits",
    icon: "deposit",
    tone: "violet",
    incoming: true,
  },
  {
    date: "2028-09-10",
    dateLabel: "10 Sep 2028",
    title: "Fixed deposit maturity",
    description: "FD002 · Maturity proceeds",
    amount: "+ ₹29,027",
    activityType: "Fixed deposits",
    icon: "deposit",
    tone: "blue",
    incoming: true,
  },
];

function UpcomingActivities({ products, onSelect }: { products: Product[]; onSelect: (type: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const linkedTypes = new Set(products.map((product) => product.type));
  const activities = upcomingActivities
    .filter((activity) => linkedTypes.has(activity.activityType))
    .sort((left, right) => left.date.localeCompare(right.date));
  const visibleActivities = showAll ? activities : activities.slice(0, 5);

  return (
    <>
      <div className="upcoming-list">
        {visibleActivities.map((activity) => (
          <button className="upcoming-row" key={`${activity.date}-${activity.title}`} onClick={() => onSelect(activity.activityType)} type="button">
            <span className="upcoming-date">{activity.dateLabel}</span>
            <span className={`product-icon product-icon-${activity.tone}`}><Icon name={activity.icon} size={18} /></span>
            <span className="upcoming-copy">
              <strong>{activity.title}</strong>
              <small>{activity.description}</small>
            </span>
            <span className={`upcoming-amount ${activity.incoming ? "is-incoming" : ""}`}>{activity.amount}</span>
          </button>
        ))}
      </div>
      {activities.length > 5 && <button aria-expanded={showAll} className="upcoming-view-more" onClick={() => setShowAll((visible) => !visible)} type="button">{showAll ? "Show less" : `View all ${activities.length} upcoming`} <Icon name="chevron" size={15} /></button>}
    </>
  );
}

type ChatTurn = {
  id: number;
  title?: string;
  query: string;
  answer: string;
  link: boolean;
  visibleSteps: number;
  timestamp: string;
  accountBalanceAtQuery?: string;
  rainyBalanceAtQuery?: number;
  pocketsAtQuery?: Pocket[];
  productsAtQuery?: Product[];
  supportOptionsOpened?: boolean;
  supportContactSelected?: boolean;
  supportTransferConfirmed?: boolean;
  supportTransferCancelled?: boolean;
};

function parseCurrencyAmount(value: string): number {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatRupees(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function isInvestmentQuery(query: string): boolean {
  return /invest|investment|grow|where can i put|where should i put|fixed deposit|\bfd\b|mutual fund|recurring deposit|\brd\b|portfolio/i.test(query);
}

function isLoanQuery(query: string): boolean {
  return /\bloan\b|\bemi\b|repayment|outstanding balance/i.test(query);
}

function isTransferRequest(query: string): boolean {
  return /\btransfer\b|\b(?:move|send)\b.{0,50}\b(?:money|funds|cash)\b|\b(?:move|send)\b.{0,50}(?:₹\s?)?\d[\d,]*/i.test(query);
}

function isPocketQuery(query: string): boolean {
  return isInvestmentQuery(query) || /rainy days|savings pocket|pocket|save money/i.test(query);
}

function monthlyContribution(product?: Product): string | undefined {
  return product?.number.match(/₹\s?[\d,]+\smonthly/i)?.[0].replace(/\s+monthly/i, "/month");
}

function createInvestmentAnswer(query: string, products: Product[], rainyBalance: number, pockets: Pocket[] = []): string {
  if (isTransferRequest(query)) {
    return "I can’t transfer or move money on your behalf. Talk to an Equitas representative for help; no money will move from this chat.";
  }
  const savingsBalance = parseCurrencyAmount(products.find((product) => product.type === "Savings account")?.amount ?? "₹1,20,430");
  const rainyTopUp = Math.min(MAX_RAINY_TOP_UP, Math.max(0, savingsBalance - 50000), Math.max(0, 50000 - rainyBalance));
  const loan = products.find((product) => product.type === "Personal loan");
  const loanReserve = loan ? PERSONAL_LOAN_EMI : 0;
  const fixedDepositAmount = Math.min(40000, Math.max(0, savingsBalance - 50000 - loanReserve - rainyTopUp));
  const fixedDeposits = products.find((product) => product.type === "Fixed deposits");
  const recurringDeposit = products.find((product) => product.type === "Recurring deposit");
  const mutualFunds = products.find((product) => product.type === "Mutual funds");
  const recurringAmount = monthlyContribution(recurringDeposit);
  const existingHoldings = [
    fixedDeposits && `${fixedDeposits.type} ${fixedDeposits.amount.trim()}`,
    recurringDeposit && `${recurringDeposit.type} ${recurringDeposit.amount.trim()}`,
    mutualFunds && `${mutualFunds.type} ${mutualFunds.amount.trim()}`,
  ].filter((holding): holding is string => Boolean(holding));
  const loanContext = loan
    ? ` Your personal loan has ${loan.amount.trim()} outstanding, with a ${formatRupees(PERSONAL_LOAN_EMI)} EMI due ${PERSONAL_LOAN_NEXT_DUE}; I’ve kept that payment amount accessible.`
    : "";
  const ongoingOptions = [
    recurringDeposit && `continue your RD${recurringAmount ? ` at ${recurringAmount}` : ""}`,
    mutualFunds && "review your existing mutual-fund portfolio before adding another SIP",
  ].filter((option): option is string => Boolean(option));
  const productContext = existingHoldings.length ? ` Your existing holdings include ${existingHoldings.join(", ")}.` : "";
  const savingsContext = ` I can see ${formatRupees(savingsBalance)} in your savings account and would keep at least ₹50,000 accessible as a buffer.`;

  if (isInvestmentQuery(query)) {
    const nextSteps = [
      fixedDepositAmount > 0 && `consider an additional ${formatRupees(fixedDepositAmount)} six-month FD`,
      ...ongoingOptions,
      rainyTopUp > 0 && `add ${formatRupees(rainyTopUp)} to Rainy Days`,
    ].filter((option): option is string => Boolean(option));
    return `${savingsContext}${loanContext}${productContext} As an illustrative plan, ${nextSteps.join(", ")}. The Rainy Days amount is a suggested top-up, not a transfer. These are suggestions only; nothing moves unless you confirm it.`;
  }
  if (isPocketQuery(query)) {
    const matchedPockets = pockets.filter((pocket) => query.toLowerCase().includes(pocket.name.toLowerCase()));
    const relevantPockets = matchedPockets.length ? matchedPockets : pockets;
    const pocketSummary = relevantPockets.length
      ? relevantPockets.map((pocket) => `${pocket.name}: ${formatRupees(pocket.balance)}`).join("; ")
      : `Rainy Days: ${formatRupees(rainyBalance)}`;
    return `I checked your account context.${savingsContext} ${matchedPockets.length ? "Here are the details for the pocket you asked about:" : "Here are your individual pocket balances:"} ${pocketSummary}.`;
  }
  if (isLoanQuery(query) && loan) {
    return `Your personal loan has ${loan.amount.trim()} outstanding, with ${formatRupees(PERSONAL_LOAN_EMI)} monthly EMI due ${PERSONAL_LOAN_NEXT_DUE}. The interest rate is ${PERSONAL_LOAN_RATE}, with ${PERSONAL_LOAN_REMAINING_INSTALLMENTS} instalments remaining. Keep the upcoming EMI accessible before setting aside money for other goals.`;
  }
  return "I checked your account context and can help with your banking question. Tell me which account or service you’d like to know about.";
}

const thinkingSteps = [
  { title: "Understand the request", detail: "Identify the financial intent and the answer needed.", time: "0:00" },
  { title: "Check consent and context", detail: "Confirm secure access to the relevant banking profile.", time: "0:01" },
  { title: "Read account signals", detail: "Fetch balances, transactions and upcoming commitments.", time: "0:03" },
  { title: "Apply financial guardrails", detail: "Evaluate affordability, safety buffer and policy rules.", time: "0:06" },
  { title: "Prepare the response", detail: "Build a clear answer with useful next steps.", time: "0:09" },
];

function ConsentSettings() {
  const [personalised, setPersonalised] = useState(true);
  const [updates, setUpdates] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  return (
    <div className="security-settings consent-settings">
      <div className="settings-card">
        <div className="settings-card-head">
          <div><strong>Personalised insights</strong><p>Use balances, transactions and upcoming payments to give relevant suggestions.</p></div>
          <button aria-checked={personalised} aria-label="Personalised insights" className={`consent-toggle ${personalised ? "is-on" : ""}`} onClick={() => setPersonalised(!personalised)} role="switch" type="button"><i /></button>
        </div>
        <div className="settings-uses">
          <span><i><Icon name="card" /></i>Account balances</span>
          <span><i><Icon name="repeat" /></i>Transactions</span>
          <span><i><Icon name="bank" /></i>Loan payments</span>
        </div>
      </div>
      <div className="settings-card settings-update">
        <div><strong>Product updates</strong><p>Receive useful updates about relevant Equitas products and features.</p></div>
        <button aria-checked={updates} aria-label="Product updates" className={`consent-toggle ${updates ? "is-on" : ""}`} onClick={() => setUpdates(!updates)} role="switch" type="button"><i /></button>
      </div>
      <div className="settings-links">
        {["Data access details", "How AI guidance works", "Help & support"].map((label) => <button key={label} onClick={() => setActiveSetting(activeSetting === label ? null : label)} type="button"><span>{label}</span><Icon name="arrow" /></button>)}
      </div>
      {activeSetting && <div className="settings-inline-detail"><strong>{activeSetting}</strong><p>{activeSetting === "Data access details" ? "Your selected account balances, transactions and loan payments are used only to personalise guidance." : activeSetting === "How AI guidance works" ? "AIdy provides suggestions using read-only account information. Transfers require your review and confirmation." : "Call 1800 103 1222 or visit your nearest Equitas branch for assistance."}</p></div>}
      <p className="settings-saved"><Icon name="lock" size={16} /> Your preferences are saved automatically.</p>
    </div>
  );
}

function SecuritySettings() {
  const [biometric, setBiometric] = useState(true);
  const [trustedDevice, setTrustedDevice] = useState(true);
  const [notice, setNotice] = useState("");
  return (
    <div className="security-settings">
      <div className="settings-card settings-update">
        <div><strong>Biometric sign-in</strong><p>Use your device biometrics for a faster, secure sign-in.</p></div>
        <button aria-checked={biometric} aria-label="Biometric sign-in" className={`consent-toggle ${biometric ? "is-on" : ""}`} onClick={() => setBiometric((enabled) => !enabled)} role="switch" type="button"><i /></button>
      </div>
      <div className="settings-card settings-update">
        <div><strong>Trusted device</strong><p>This device is recognised for secure access to your account.</p></div>
        <button aria-checked={trustedDevice} aria-label="Trusted device" className={`consent-toggle ${trustedDevice ? "is-on" : ""}`} onClick={() => setTrustedDevice((enabled) => !enabled)} role="switch" type="button"><i /></button>
      </div>
      <div className="settings-links"><button onClick={() => setNotice("Other devices have been signed out.")} type="button"><span>Sign out of all other devices</span><Icon name="arrow" /></button></div>
      {notice && <p className="settings-inline-detail" role="status">{notice}</p>}
      <p className="settings-saved"><Icon name="lock" size={16} /> Security preferences apply to this session.</p>
    </div>
  );
}

const sampleHistory: ChatTurn[] = [
  { id: -1, title: "How much can I save?", query: "How much can I save?", answer: "I reviewed your accounts and cash flow. You can safely plan this while retaining enough for upcoming commitments.", link: false, visibleSteps: 5, timestamp: "Just now" },
  { id: -2, title: "Salary credited — move to Rainy days", query: "My salary of ₹45,000 has been credited. Can I save ₹7,250?", answer: "You can move ₹7,250 to Rainy days while keeping a comfortable buffer.", link: false, visibleSteps: 5, timestamp: "Today, 10:14 AM" },
  { id: -3, title: "What is my account balance?", query: "What is my account balance?", answer: "Your available account balance is ₹1,20,430.", link: false, visibleSteps: 5, timestamp: "14 Oct 2026" },
  { id: -4, title: "Can I invest in a mutual fund?", query: "Can I invest in a mutual fund?", answer: "After keeping ₹50,000 accessible and reserving ₹9,250 for your 2 Nov loan EMI, you could consider a ₹40,000 six-month FD and a ₹7,250 Rainy Days top-up. Review your existing mutual funds before adding another SIP.", link: false, visibleSteps: 5, timestamp: "12 Oct 2026" },
  { id: -5, title: "Show recent transactions", query: "Show my recent transactions", answer: "I found your recent account activity and grouped it for review.", link: false, visibleSteps: 5, timestamp: "10 Oct 2026" },
  { id: -6, title: "Plan a fixed deposit", query: "Suggest a fixed deposit plan", answer: "A six-month fixed deposit can keep your money safe while providing a predictable return. Keep your ₹9,250 loan EMI and emergency buffer accessible, and consider a ₹7,250 Rainy Days top-up.", link: false, visibleSteps: 5, timestamp: "8 Oct 2026" },
  { id: -7, title: "Personal loan repayment", query: "What is my personal loan EMI?", answer: `Your personal loan has ${PERSONAL_LOAN_OUTSTANDING} outstanding, with a ${formatRupees(PERSONAL_LOAN_EMI)} monthly EMI due ${PERSONAL_LOAN_NEXT_DUE}.`, link: false, visibleSteps: 5, timestamp: "6 Oct 2026" },
];

type AdminMessage = { speaker: "Assistant" | "Customer"; time: string; text: string };
type AdminConversation = { title: string; time: string; messages: AdminMessage[] };

const seedAdminConversations: Record<string, AdminConversation[]> = {
  "123456789": [
    {
      title: "Salary credited — savings guidance",
      time: "23 Oct 2026, 12:42 PM",
      messages: [
        { speaker: "Assistant", time: "12:40 PM", text: `Your available savings balance is ₹1,20,430. I’ll keep ₹50,000 as a buffer and reserve your ${formatRupees(PERSONAL_LOAN_EMI)} EMI due ${PERSONAL_LOAN_NEXT_DUE}. Your current holdings include fixed deposits, a recurring deposit, mutual funds, and ₹${(25500).toLocaleString("en-IN")} in Rainy Days.` },
        { speaker: "Customer", time: "12:41 PM", text: "Where can I invest the money I have?" },
        { speaker: "Assistant", time: "12:42 PM", text: `As an illustration, you could consider a ₹40,000 six-month fixed deposit, add up to ${formatRupees(MAX_RAINY_TOP_UP)} to Rainy Days toward its ₹50,000 goal, continue your ₹3,000 monthly RD, and review your current mutual-fund portfolio before adding another SIP. Your ${formatRupees(PERSONAL_LOAN_EMI)} EMI remains reserved. Nothing moves unless you take action.` },
      ],
    },
    {
      title: "Rainy Days pocket",
      time: "22 Oct 2026, 4:18 PM",
      messages: [
        { speaker: "Customer", time: "4:16 PM", text: "How much is in my Rainy Days pocket?" },
        { speaker: "Assistant", time: "4:18 PM", text: "Your Rainy Days pocket currently has ₹25,500 toward your ₹50,000 goal." },
      ],
    },
    {
      title: "Personal loan repayment",
      time: "21 Oct 2026, 9:14 AM",
      messages: [
        { speaker: "Customer", time: "9:12 AM", text: "When is my next personal loan EMI?" },
        { speaker: "Assistant", time: "9:14 AM", text: `Your personal loan has ${PERSONAL_LOAN_OUTSTANDING} outstanding. The monthly EMI is ${formatRupees(PERSONAL_LOAN_EMI)}, due ${PERSONAL_LOAN_NEXT_DUE}; 24 instalments remain.` },
      ],
    },
  ],
  "222222222": [
    {
      title: "Savings balance and monthly expenses",
      time: "23 Oct 2026, 11:26 AM",
      messages: [
        { speaker: "Customer", time: "11:24 AM", text: "Can you help me review my savings?" },
        { speaker: "Assistant", time: "11:26 AM", text: `Your savings account has ₹1,20,430. Keep your ₹50,000 emergency buffer and ${formatRupees(PERSONAL_LOAN_EMI)} loan EMI due ${PERSONAL_LOAN_NEXT_DUE} accessible before committing other funds.` },
      ],
    },
  ],
  "333333333": [
    {
      title: "Account balance",
      time: "21 Oct 2026, 9:14 AM",
      messages: [
        { speaker: "Customer", time: "9:13 AM", text: "What is my account balance?" },
        { speaker: "Assistant", time: "9:14 AM", text: `Your available savings account balance is ₹1,20,430. Your personal loan EMI of ${formatRupees(PERSONAL_LOAN_EMI)} is due ${PERSONAL_LOAN_NEXT_DUE}.` },
      ],
    },
  ],
  "444444444": [
    {
      title: "Portfolio overview",
      time: "23 Oct 2026, 10:08 AM",
      messages: [
        { speaker: "Customer", time: "10:06 AM", text: "Summarise my investments." },
        { speaker: "Assistant", time: "10:08 AM", text: `Your linked products include fixed deposits, a recurring deposit, mutual funds, and a personal loan with ${PERSONAL_LOAN_OUTSTANDING} outstanding. Keep the ${formatRupees(PERSONAL_LOAN_EMI)} EMI due ${PERSONAL_LOAN_NEXT_DUE} in your upcoming-payment plan before making new investments.` },
      ],
    },
  ],
};

function AdminWorkspace({ onBack, conversationsByCustomer }: { onBack: () => void; conversationsByCustomer: Record<string, ChatTurn[]> }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerPage, setCustomerPage] = useState(0);
  const customerPageSize = 10;
  const customers = mockUsers.map((customer, index) => {
    const liveTurns = conversationsByCustomer[customer.id] ?? [];
    const seeded = seedAdminConversations[customer.id] ?? [];
    return {
      ...customer,
      reference: `C00${index + 1}`,
      liveTurns,
      conversations: seeded,
      messageCount: seeded.reduce((total, conversation) => total + conversation.messages.length, 0) + liveTurns.length * 2,
      lastActivity: liveTurns.at(-1)?.timestamp ?? seeded[0]?.time ?? "No activity",
      lastEvent: liveTurns.at(-1)?.query ?? seeded[0]?.title ?? "No conversations yet",
    };
  });
  const normalizedSearch = customerSearch.trim().toLocaleLowerCase();
  const filteredCustomers = customers.filter((customer) =>
    [customer.name, customer.firstName, customer.id, customer.reference, customer.email]
      .some((value) => value.toLocaleLowerCase().includes(normalizedSearch)),
  );
  const pageCount = Math.max(1, Math.ceil(filteredCustomers.length / customerPageSize));
  const visibleCustomers = filteredCustomers.slice(customerPage * customerPageSize, (customerPage + 1) * customerPageSize);
  const selectedCustomer = customers.find((customer) => customer.id === selectedCustomerId);
  const liveTranscript: AdminMessage[] = selectedCustomer?.liveTurns.flatMap((turn) => [
    { speaker: "Customer" as const, time: turn.timestamp, text: turn.query },
    { speaker: "Assistant" as const, time: turn.timestamp, text: turn.answer },
    ...(turn.supportOptionsOpened ? [{ speaker: "Customer" as const, time: turn.timestamp, text: "Talk to a person" }] : []),
    ...(turn.supportContactSelected ? [{ speaker: "Customer" as const, time: turn.timestamp, text: "Talk to an agent" }] : []),
    ...(turn.supportTransferConfirmed ? [{ speaker: "Assistant" as const, time: turn.timestamp, text: "The customer confirmed the Rainy Days transfer. Account balances were updated." }] : []),
    ...(turn.supportTransferCancelled ? [{ speaker: "Assistant" as const, time: turn.timestamp, text: "The customer cancelled the transfer. No balance changed." }] : []),
  ]) ?? [];
  const totalConversations = customers.reduce((total, customer) => total + customer.conversations.length + (customer.liveTurns.length ? 1 : 0), 0);

  return (
    <main className="admin-workspace">
      <header className="admin-header">
        <div className="admin-brand"><Logo light /><strong>Support workspace</strong></div>
        <div className="admin-header-actions"><span className="admin-avatar">AD</span><strong>Admin</strong><button onClick={onBack} type="button">Sign out</button></div>
      </header>
      <section className="admin-content" id="admin-customers">
        <div className="admin-page-heading"><div><span className="eyebrow">Support workspace</span><h1>Customers & conversations</h1><p>Select a customer to review their assistant conversation history.</p></div></div>
        <div className="admin-stat-grid">
          <article><small>Total customers</small><strong>{customers.length}</strong><span>Mock customer profiles</span></article>
          <article><small>Conversations</small><strong>{totalConversations}</strong><span>Seeded and this-session chats</span></article>
          <article><small>Active customers</small><strong>{customers.length}</strong><span>Available in this demo</span></article>
        </div>
        <section className="admin-customer-panel">
          <div className="admin-section-heading">
            <div><h2>Customer list</h2><p>Search by customer name, ID, email, or reference.</p></div>
            <span>{filteredCustomers.length.toLocaleString()} {filteredCustomers.length === 1 ? "customer" : "customers"}</span>
          </div>
          <div className="admin-customer-tools">
            <label className="admin-customer-search">
              <Icon name="search" size={17} />
              <input
                aria-label="Search customers"
                onChange={(event) => { setCustomerSearch(event.target.value); setCustomerPage(0); }}
                placeholder="Search customers"
                type="search"
                value={customerSearch}
              />
            </label>
            <span>{filteredCustomers.length ? `${(customerPage * customerPageSize + 1).toLocaleString()}–${Math.min((customerPage + 1) * customerPageSize, filteredCustomers.length).toLocaleString()} of ${filteredCustomers.length.toLocaleString()}` : "No results"}</span>
          </div>
          <div className="admin-table-scroll">
            <table className="admin-customer-table">
              <thead><tr><th>Customer</th><th>Status</th><th>Last event</th><th>Messages</th><th>Last activity</th></tr></thead>
              <tbody>{visibleCustomers.map((customer) => (
                <tr className={selectedCustomerId === customer.id ? "is-selected" : ""} key={customer.id}>
                  <td><button className="admin-customer-select" onClick={() => setSelectedCustomerId(customer.id)} type="button"><span className="admin-customer-avatar">{customer.firstName.slice(0, 1)}</span><span><strong>{customer.name}</strong><small>{customer.reference} · {customer.id}</small></span></button></td>
                  <td><span className="admin-status"><i /> Active</span></td>
                  <td className="admin-last-event">{customer.lastEvent}</td>
                  <td>{customer.messageCount}</td>
                  <td>{customer.lastActivity}</td>
                </tr>
              ))}{visibleCustomers.length === 0 && <tr><td className="admin-empty-search" colSpan={5}>No customers match “{customerSearch}”. Try another name, ID, or email.</td></tr>}</tbody>
            </table>
          </div>
          <div className="admin-customer-pagination">
            <span>Page {customerPage + 1} of {pageCount}</span>
            <div>
              <button disabled={customerPage === 0} onClick={() => setCustomerPage((page) => Math.max(0, page - 1))} type="button">Previous</button>
              <button disabled={customerPage + 1 >= pageCount} onClick={() => setCustomerPage((page) => Math.min(pageCount - 1, page + 1))} type="button">Next</button>
            </div>
          </div>
        </section>
        {selectedCustomer && <section className="admin-transcript-panel" id="admin-conversations">
          <div className="admin-transcript-heading"><div><span className="eyebrow">Customer {selectedCustomer.reference} · active</span><h2>Conversation transcript</h2><p>{selectedCustomer.firstName} {selectedCustomer.name.split(" ").at(-1)?.slice(0, 1)}.•• · {selectedCustomer.conversations.length + (selectedCustomer.liveTurns.length ? 1 : 0)} conversations · {selectedCustomer.messageCount} messages</p></div><button onClick={() => setSelectedCustomerId(null)} type="button">Close transcript <Icon name="close" size={15} /></button></div>
          <div className="admin-conversation-list">
            {selectedCustomer.liveTurns.length > 0 && <article className="admin-conversation-block"><div className="admin-conversation-meta"><strong>Current session</strong><time>{selectedCustomer.lastActivity}</time></div>{liveTranscript.map((message, index) => <div className="admin-transcript-message" key={`${message.time}-${index}`}><div><strong>{message.speaker}</strong><time>{message.time}</time></div><p>{message.text}</p></div>)}</article>}
            {selectedCustomer.conversations.map((conversation) => <article className="admin-conversation-block" key={conversation.title}><div className="admin-conversation-meta"><strong>{conversation.title}</strong><time>{conversation.time}</time></div>{conversation.messages.map((message, index) => <div className="admin-transcript-message" key={`${message.time}-${index}`}><div><strong>{message.speaker}</strong><time>{message.time}</time></div><p>{message.text}</p></div>)}</article>)}
          </div>
          <div className="admin-audit"><strong>What the assistant did</strong>{["Consent checked", "Account context reviewed", "Guidance shown", "No money moved"].map((label) => <span key={label}><Icon name="check" size={14} /> {label}</span>)}</div>
        </section>}
        <button className="admin-back-login" onClick={onBack} type="button"><Icon name="back" size={15} /> Back to sign in</button>
      </section>
    </main>
  );
}

function ChatHistory({ accountBalance, accountNumber, onExpand, pockets, products, rainyBalance, selected, setSelected, showAll = false, turns }: { accountBalance: string; accountNumber: string; onExpand?: () => void; pockets: Pocket[]; products: Product[]; rainyBalance: number; selected: ChatTurn | null; setSelected: (turn: ChatTurn | null) => void; showAll?: boolean; turns: ChatTurn[] }) {
  const allConversations = [...turns].reverse().concat(sampleHistory);
  const conversations = showAll ? allConversations : allConversations.slice(0, 6);

  if (selected) {
    return (
      <div className="conversation-detail">
        <div className="history-static-query"><span>{selected.query}</span><small>{selected.timestamp}</small></div>
        <div className="conversation-response-scroll"><ChatTurnView accountBalance={accountBalance} accountNumber={accountNumber} hideQuery pockets={pockets} products={products} rainyBalance={rainyBalance} turn={{ ...selected, visibleSteps: thinkingSteps.length }} /></div>
        <p className="conversation-secure"><Icon name="shield" size={17} /> This answer used secure, read-only account insights.</p>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-list-tools">
        <div className="history-count"><Icon name="repeat" size={20} /> {showAll ? `${conversations.length} conversations` : `${conversations.length} recent conversations`}</div>
        {onExpand && <button className="history-expand-button" onClick={onExpand} type="button"><Icon name="expand" size={15} /> Open full page</button>}
      </div>
      <div className="history-list">
        {conversations.map((turn) => (
          <button key={turn.id} onClick={() => setSelected(turn)} type="button">
            <span className="history-chat-icon"><Icon name="chat" /></span>
            <span><strong>{turn.title ?? turn.query}</strong><small>{turn.query}</small><time>{turn.timestamp}</time></span>
            <Icon name="arrow" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}

const profileFlowMenus: Record<string, { label: string; subtitle: string; icon: IconName }[]> = {
  "Personal details": [{ label: "Basic information", subtitle: "Name, date of birth, and contact", icon: "user" }],
  "Bank account details": [
    { label: "Account information", subtitle: "Holder name, IFSC and branch", icon: "bank" },
    { label: "Account statement", subtitle: "View and download activity", icon: "card" },
  ],
  "KYC information": [
    { label: "KYC status", subtitle: "Verification and linked documents", icon: "shield" },
    { label: "KYC documents", subtitle: "Review linked identity documents", icon: "card" },
  ],
  "Communication preferences": [
    { label: "Transaction alerts", subtitle: "Credits, debits and UPI alerts", icon: "card" },
    { label: "Monthly statements", subtitle: "Statement delivery schedule", icon: "mail" },
    { label: "Service updates", subtitle: "Important banking updates", icon: "bell" },
    { label: "Promotional offers", subtitle: "Relevant Equitas offers", icon: "fund" },
    { label: "Preferred channels", subtitle: "Email, SMS and push", icon: "phone" },
  ],
  "Savings account": [
    { label: "View transactions", subtitle: "Recent account activity", icon: "card" },
    { label: "Account statement", subtitle: "Download your statement", icon: "mail" },
    { label: "Manage limits", subtitle: "Transaction and payment limits", icon: "bank" },
  ],
  "Fixed deposits": [
    { label: "FD001 · General Public", subtitle: "₹50,000 · Matures 15 Mar 2027", icon: "deposit" },
    { label: "FD002 · Senior Citizen", subtitle: "₹25,000 · Matures 10 Sep 2028", icon: "deposit" },
  ],
  "Recurring deposit": [{ label: "RD001 · Monthly Savings", subtitle: "₹30,000 · Monthly ₹3,000", icon: "repeat" }],
  "Personal loan": [
    { label: "Loan account details", subtitle: "Outstanding balance and loan terms", icon: "card" },
    { label: "Repayment schedule", subtitle: "Next EMI and upcoming instalments", icon: "repeat" },
  ],
  "Mutual funds": [
    { label: "View portfolio", subtitle: "Allocation and performance", icon: "chart" },
    { label: "Invest in fund", subtitle: "Explore available mutual funds", icon: "fund" },
    { label: "Transaction history", subtitle: "SIPs and redemptions", icon: "repeat" },
  ],
  "Rainy Days": [
    { label: "Pocket details", subtitle: "Goal, balance and progress", icon: "deposit" },
    { label: "Pocket activity", subtitle: "Money added to this pocket", icon: "repeat" },
  ],
};

const mockTransactions = [
  ["15 Oct 2026", "Transfer from TCS", "+ ₹45,000"],
  ["12 Oct 2026", "Amazon Purchase", "- ₹2,450"],
  ["10 Oct 2026", "Zomato", "- ₹640"],
  ["01 Oct 2026", "Interest Credit", "+ ₹312"],
];

const preferenceOptions: Record<string, string[]> = {
  "Transaction alerts": ["Account credits", "Account debits", "UPI transfers", "Failed transactions"],
  "Monthly statements": ["Monthly statement", "Quarterly summary"],
  "Service updates": ["Security notices", "Account changes", "Scheduled maintenance"],
  "Promotional offers": ["Equitas offers", "Partner offers"],
  "Preferred channels": ["Email", "SMS", "Push notifications"],
};

function ProfileFlow({ onPocketCreated, pockets, product, rainyBalance, screen, setScreen, title, user }: { onPocketCreated: (name: string, goal: number) => void; pockets: Pocket[]; product?: Product; rainyBalance: number; screen: string | null; setScreen: (screen: string | null) => void; title: string; user: MockUser }) {
  const [notice, setNotice] = useState("");
  const [pocketName, setPocketName] = useState("");
  const [pocketGoal, setPocketGoal] = useState("");
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    "Account credits": true,
    "Account debits": true,
    "UPI transfers": true,
    "Failed transactions": true,
    "Monthly statement": true,
    "Quarterly summary": false,
    "Security notices": true,
    "Account changes": true,
    "Scheduled maintenance": false,
    "Equitas offers": false,
    "Partner offers": false,
    Email: true,
    SMS: true,
    "Push notifications": true,
  });
  const menus = profileFlowMenus[title] ?? [
    { label: `${title} details`, subtitle: "View product information", icon: product?.icon ?? "card" },
    { label: "Manage product", subtitle: "Update product preferences", icon: "bank" },
  ];

  function createPocket(event: FormEvent) {
    event.preventDefault();
    const name = pocketName.trim();
    const goal = Number(pocketGoal);
    if (!name || !Number.isFinite(goal) || goal <= 0) {
      setNotice("Enter a pocket name and a valid savings goal.");
      return;
    }
    if (pockets.some((pocket) => pocket.name.toLowerCase() === name.toLowerCase())) {
      setNotice("A pocket with this name already exists.");
      return;
    }
    onPocketCreated(name, goal);
  }

  const pocketCreationForm = (
    <form className="new-pocket-form" onSubmit={createPocket}>
      <label><span>Pocket name</span><input maxLength={28} onChange={(event) => setPocketName(event.target.value)} placeholder="e.g. Weekend getaway" value={pocketName} /></label>
      <label><span>Savings goal</span><span className="new-pocket-goal"><b>₹</b><input inputMode="numeric" min="1" onChange={(event) => setPocketGoal(event.target.value)} placeholder="Enter goal amount" type="number" value={pocketGoal} /></span></label>
      <p>Start with a goal you can work towards. You can add money to this pocket later.</p>
      {notice && <p className="new-pocket-notice" role="alert">{notice}</p>}
      <button className="new-pocket-submit" type="submit">Create pocket <Icon name="arrow" size={15} /></button>
    </form>
  );

  function downloadStatement() {
    const rows = [
      "Date,Description,Amount",
      ...mockTransactions.map(([date, description, amount]) => `${date},"${description}",${amount.replace(/[₹\s,]/g, "")}`),
    ];
    const file = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = screen?.toLowerCase().includes("statement") ? "equitas-account-statement.csv" : "equitas-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Download started");
  }

  if (!screen) {
    return (
      <div className="profile-flow">
        {title === "Rainy Days" && <div className="flow-balance"><span>Available in pocket</span><strong>₹{rainyBalance.toLocaleString("en-IN")}</strong><small>{Math.min(100, Math.round((rainyBalance / 50000) * 100))}% of ₹50,000 goal covered</small><progress className="profile-rainy-progress" max="50000" value={rainyBalance} /></div>}
        {title === "Savings account" && <div className="flow-balance"><span>Available balance</span><strong>{product?.amount ?? "₹1,20,430"}</strong><small>4821 •••• •••• 1234 · Active</small></div>}
        {title === "Personal loan" && <div className="flow-balance flow-balance-loan"><span>Outstanding balance</span><strong>{product?.amount ?? PERSONAL_LOAN_OUTSTANDING}</strong><small>Personal loan · {PERSONAL_LOAN_REMAINING_INSTALLMENTS} instalments remaining</small></div>}
        {title === "Mutual funds" && <div className="flow-balance flow-balance-violet"><span>Current value</span><strong>{product?.amount ?? "₹23,220"}</strong><small>Returns + ₹1,720 (+8.2%)</small></div>}
        {title === "My pockets" && (
          <div className="my-pockets-list">
            {pockets.map((pocket) => <div className="my-pocket-row" key={pocket.name}><span className="product-icon product-icon-blue"><Icon name="deposit" size={17} /></span><span><strong>{pocket.name}</strong><small>{pocket.goal > 0 ? `${Math.min(100, Math.round((pocket.balance / pocket.goal) * 100))}% of ${formatRupees(pocket.goal)} goal` : "Flexible savings pocket"}</small></span><b>{formatRupees(pocket.balance)}</b>{pocket.goal > 0 && <progress max={pocket.goal} value={Math.min(pocket.balance, pocket.goal)} />}</div>)}
            <button className="create-pocket-button" onClick={() => setScreen("Create a pocket")} type="button"><Icon name="deposit" size={16} /> Create new pocket</button>
          </div>
        )}
        {title === "New pocket" && pocketCreationForm}
        {title === "My pockets" && screen === "Create a pocket" && pocketCreationForm}
        {title !== "My pockets" && title !== "New pocket" && <div className="flow-menu">
          {menus.map((item) => <button key={item.label} onClick={() => { setNotice(""); setScreen(item.label); }} type="button"><span><Icon name={item.icon} size={18} /></span><span><strong>{item.label}</strong><small>{item.subtitle}</small></span><Icon name="chevron" size={17} /></button>)}
        </div>}
      </div>
    );
  }

  if (title === "My pockets" && screen === "Create a pocket") {
    return <div className="profile-flow">{pocketCreationForm}</div>;
  }

  const isTransactions = screen.includes("statement") || screen.includes("transactions") || screen === "Transaction history";
  const isPreferences = title === "Communication preferences";
  const rows: [string, string][] =
    screen === "Basic information" ? [["Full name", user.name], ["Date of birth", user.dateOfBirth], ["Gender", user.gender], ["Email", user.email], ["Mobile", user.mobile], ["Mailing address", user.mailingAddress]] :
    screen === "Account information" ? [["Account number", "4821 •••• •••• 1234"], ["Account holder name", user.name], ["IFSC code", "ESFB0004821"], ["Branch", "MG Road, Bengaluru"], ["Account type", "Savings account"], ["Opened on", "12 Aug 2020"]] :
    screen === "KYC status" ? [["PAN number", "ABCDE••••F"], ["Aadhaar", "XXXX XXXX 7812"]] :
    screen === "KYC documents" ? [["Current status", "Verified"], ["PAN document", "Available"], ["Aadhaar document", "Available"], ["Next review", "12 Aug 2027"]] :
    screen.startsWith("FD001") ? [["Principal amount", "₹50,000"], ["Interest rate", "7.25% p.a."], ["Tenure", "12 months"], ["Maturity date", "15 Mar 2027"], ["Maturity value (est.)", "₹53,750"], ["Auto renewal", "Yes"]] :
    screen.startsWith("FD002") ? [["Principal amount", "₹25,000"], ["Interest rate", "7.75% p.a."], ["Tenure", "24 months"], ["Maturity date", "10 Sep 2028"], ["Maturity value (est.)", "₹29,027"], ["Auto renewal", "No"]] :
    screen.startsWith("RD001") ? [["Monthly instalment", "₹3,000"], ["Start date", "15 Jan 2026"], ["Maturity date", "15 Apr 2027"], ["Current deposits", "₹30,000"], ["Total scheduled deposits", "₹45,000"], ["Maturity value (est.)", "₹46,800"], ["Auto debit", "Enabled"]] :
    screen === "Loan account details" ? [["Loan type", "Personal loan"], ["Original principal", "₹3,00,000"], ["Outstanding balance", product?.amount ?? PERSONAL_LOAN_OUTSTANDING], ["Interest rate", PERSONAL_LOAN_RATE], ["Loan account", "PL••••3092"], ["Status", "Active"]] :
    screen === "Repayment schedule" ? [["Monthly EMI", formatRupees(PERSONAL_LOAN_EMI)], ["Next due date", PERSONAL_LOAN_NEXT_DUE], ["Instalments remaining", `${PERSONAL_LOAN_REMAINING_INSTALLMENTS}`], ["Repayment account", "Savings account · ••1234"], ["Auto debit", "Enabled"]] :
    screen === "Manage limits" ? [["Daily UPI limit", "₹1,00,000"], ["ATM withdrawal limit", "₹40,000"], ["Online purchase limit", "₹2,00,000"]] :
    screen === "Pocket details" ? [["Current balance", `₹${rainyBalance.toLocaleString("en-IN")}`], ["Savings goal", "₹50,000"], ["Goal covered", `${Math.min(100, Math.round((rainyBalance / 50000) * 100))}%`]] :
    screen === "Pocket activity" ? [["Latest transfer", "₹3,000"], ["Opening amount", "₹8,500"], ["Current balance", `₹${rainyBalance.toLocaleString("en-IN")}`], ["Pocket status", "Active"]] :
    [["Product", title], ["Reference", product?.number ?? "Active product"], ["Current value", product?.amount ?? "Available"], ["Status", "Active"]];

  return (
    <div className="profile-flow flow-detail">
      {screen === "KYC status" && <div className="kyc-verified"><Icon name="check" /><div><strong>KYC Verified</strong><span>Last verified 12 Aug 2025</span></div></div>}
      {screen === "View portfolio" ? (
        <div className="portfolio-view">
          <div className="portfolio-ring"><div><strong>₹23,220</strong><small>Current value</small></div></div>
          <div className="portfolio-legend"><span><i />Large Cap <b>40%</b></span><span><i />Flexi Cap <b>30%</b></span><span><i />Mid Cap <b>20%</b></span><span><i />Small Cap <b>10%</b></span></div>
          {["SBI Bluechip Fund · ₹9,800", "HDFC Flexi Cap Fund · ₹6,960", "Nippon India Small Cap · ₹4,200"].map((fund) => <button className="fund-row" key={fund} onClick={() => setScreen(fund)} type="button">{fund}<Icon name="chevron" size={16} /></button>)}
        </div>
      ) : isTransactions ? (
        <div className="flow-transactions">{mockTransactions.map(([date, name, amount]) => <div key={`${date}-${name}`}><span><small>{date}</small><strong>{name}</strong></span><b className={amount.startsWith("+") ? "credit" : "debit"}>{amount}</b></div>)}</div>
      ) : isPreferences ? (
        <>
          <div className="preference-list">{(preferenceOptions[screen] ?? []).map((label) => <div key={label}><span><strong>{label}</strong><small>{screen === "Preferred channels" ? `Receive updates by ${label.toLowerCase()}` : "Choose whether to receive this update"}</small></span><button aria-label={`${label} preference`} aria-checked={toggles[label]} className={`flow-toggle ${toggles[label] ? "is-on" : ""}`} onClick={() => setToggles((current) => ({ ...current, [label]: !current[label] }))} role="switch" type="button"><i /></button></div>)}</div>
          <p className="preference-helper">Changes apply immediately to this session.</p>
        </>
      ) : screen.includes("SBI Bluechip") || screen.includes("HDFC") || screen.includes("Nippon") ? (
        <div className="fund-detail"><strong>{screen.split(" · ")[0]}</strong><span>Direct Growth · Equity · Large Cap</span><div><small>Current value</small><b>₹9,800</b></div><div><small>Returns</small><b className="credit">+8.9%</b></div><div><small>Units</small><b>320.123</b></div><div><small>NAV</small><b>₹30.62</b></div></div>
      ) : (
        <div className="flow-value-list">
          {rows.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
          {screen === "Pocket details" && <div className="flow-value-toggle-row"><span>Auto-save<strong>{autoSaveEnabled ? "Enabled" : "Not enabled"}</strong></span><button aria-label="Auto-save" aria-checked={autoSaveEnabled} className={`flow-toggle ${autoSaveEnabled ? "is-on" : ""}`} onClick={() => setAutoSaveEnabled((enabled) => !enabled)} role="switch" type="button"><i /></button></div>}
        </div>
      )}
      {notice && <p className="flow-notice"><Icon name="check" size={14} /> {notice}</p>}
      {isTransactions && <div className="flow-actions">
        {isTransactions && <button onClick={downloadStatement} type="button"><Icon name="arrow" size={15} /> {screen.toLowerCase().includes("statement") ? "Download statement" : "Download transactions"}</button>}
      </div>}
    </div>
  );
}

function DetailView({ onExpandHistory, onPocketCreated, pockets, title, onBack, products, rainyBalance, turns, user }: { onExpandHistory: () => void; onPocketCreated: (name: string, goal: number) => void; pockets: Pocket[]; title: string; onBack: () => void; products: Product[]; rainyBalance: number; turns: ChatTurn[]; user: MockUser }) {
  const [flowScreen, setFlowScreen] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<ChatTurn | null>(null);
  const product = products.find((item) => item.type === title);

  const isFundDetail = flowScreen?.includes(" · ₹") ?? false;
  const pageTitle = selectedConversation
    ? selectedConversation.title ?? "Conversation"
    : flowScreen
      ? isFundDetail ? flowScreen.split(" · ")[0] : flowScreen
      : title;
  const sectionLabel = selectedConversation
    ? "Chat history"
    : flowScreen
      ? title
      : ["Savings account", "Fixed deposits", "Recurring deposit", "Personal loan", "Mutual funds", "Insurance"].includes(title)
        ? "Linked products"
        : "Profile & preferences";

  function navigateBack() {
    if (selectedConversation) {
      setSelectedConversation(null);
      return;
    }
    if (flowScreen) {
      setFlowScreen(isFundDetail ? "View portfolio" : null);
      return;
    }
    onBack();
  }

  return (
    <div className="drawer-detail">
      <div className="detail-navigation">
        <div className="detail-page-heading">
          <small>{sectionLabel}</small>
          <h3>{pageTitle}</h3>
        </div>
        <button aria-label="Back" className="profile-back-button" onClick={navigateBack} type="button"><Icon name="back" size={16} /> Back</button>
      </div>
      {title === "Security settings" ? <SecuritySettings /> : title === "Consent" ? <ConsentSettings /> : title === "Chat history" ? <ChatHistory accountBalance={products[0]?.amount ?? "₹1,20,430"} accountNumber={products[0]?.number ?? "4821 •••• •••• 1234"} onExpand={onExpandHistory} pockets={pockets} products={products} rainyBalance={rainyBalance} selected={selectedConversation} setSelected={setSelectedConversation} turns={turns} /> : <ProfileFlow onPocketCreated={onPocketCreated} pockets={pockets} product={product} rainyBalance={rainyBalance} screen={flowScreen} setScreen={setFlowScreen} title={title} user={user} />}
    </div>
  );
}

function ProfileDrawer({
  open,
  scrollToProducts,
  onProductsScrollComplete,
  onClose,
  onLogout,
  initialDetail,
  onExpandHistory,
  onPocketCreated,
  products,
  pockets,
  rainyBalance,
  turns,
  user,
}: {
  open: boolean;
  scrollToProducts: boolean;
  onProductsScrollComplete: () => void;
  onClose: () => void;
  onLogout: () => void;
  initialDetail?: string | null;
  onExpandHistory: () => void;
  onPocketCreated: (name: string, goal: number) => void;
  products: Product[];
  pockets: Pocket[];
  rainyBalance: number;
  turns: ChatTurn[];
  user: MockUser;
}) {
  const [detail, setDetail] = useState<string | null>(initialDetail ?? null);
  const drawerScrollRef = useRef<HTMLDivElement>(null);
  const linkedProductsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || !scrollToProducts || !drawerScrollRef.current || !linkedProductsRef.current) return;
    const scrollContainer = drawerScrollRef.current;
    const section = linkedProductsRef.current;
    scrollContainer.scrollTo({
      top: section.offsetTop - scrollContainer.offsetTop,
      behavior: "smooth",
    });
    onProductsScrollComplete();
  }, [open, onProductsScrollComplete, scrollToProducts]);

  function close() {
    setDetail(null);
    onClose();
  }

  return (
    <>
      <button aria-label="Close profile" className={`drawer-overlay ${open ? "is-open" : ""}`} onClick={close} type="button" />
      <aside aria-hidden={!open} className={`profile-drawer ${open ? "is-open" : ""}`}>
        <div className="drawer-top">
          <Logo />
          <button aria-label="Close profile" className="icon-button" onClick={close} type="button"><Icon name="close" /></button>
        </div>
        {detail ? (
          <DetailView onBack={() => setDetail(null)} onExpandHistory={onExpandHistory} onPocketCreated={onPocketCreated} pockets={pockets} products={products} rainyBalance={rainyBalance} title={detail} turns={turns} user={user} />
        ) : (
          <div className="drawer-scroll" ref={drawerScrollRef}>
            <section className="profile-summary">
              <div className="avatar avatar-large"><Icon name="user" /></div>
              <div><strong>{user.name}</strong><span>Customer ID: {user.id}</span><small><i /> Verified customer</small></div>
            </section>
            <section className="profile-section">
              <div className="section-kicker">Profile & preferences</div>
              {profileItems.map((item) => (
                <button className="profile-row" key={item.title} onClick={() => setDetail(item.title)} type="button">
                  <span className="profile-row-icon"><Icon name={item.icon} /></span>
                  <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
                  <Icon name="chevron" size={18} />
                </button>
              ))}
            </section>
            <section className="profile-section" ref={linkedProductsRef}>
              <div className="section-kicker">Your products</div>
              {products.map((product) => (
                <button className="profile-row" key={product.type} onClick={() => setDetail(product.type)} type="button">
                  <span className={`product-icon product-icon-${product.tone}`}><Icon name={product.icon} /></span>
                  <span><strong>{product.type}</strong><small>{product.number}</small></span>
                  <Icon name="chevron" size={18} />
                </button>
              ))}
            </section>
            <button className="logout-button" onClick={onLogout} type="button">Sign out</button>
          </div>
        )}
      </aside>
    </>
  );
}

const suggestedMessages: { query: string; icon: IconName }[] = [
  { query: "Where can I invest my savings?", icon: "fund" },
  { query: "How much is in my Rainy Days pocket?", icon: "deposit" },
  { query: "I want to transfer money to Rainy Days", icon: "repeat" },
];

function TraceFlow({ complete, progress }: { complete: boolean; progress: number }) {
  const state = (step: number) => progress > step ? "is-done" : progress === step ? "is-active" : "";
  return (
    <div className="flow-view">
      <div className="flow-view-title"><span>Secure orchestration trace</span><div><strong>One controlled flow for every chat turn</strong><small>Live tools and decisions activate from left to right.</small></div></div>
      <div className="flow-diagram">
        <div className="flow-start">
          <div className={state(0)}><strong>Chat request</strong><small>Rajesh · Ask Equitas</small></div>
          <div className={state(1)}><strong>Profile context</strong><small>Consent and preferences</small></div>
        </div>
        <i className={progress >= 1 ? "is-flowing" : ""} />
        <div className="flow-orchestration">
          <strong>Ask Equitas orchestration <small>secure banking layer</small></strong>
          <span className={state(0)}>Intent & routing <small>request understood</small></span>
          <span className={state(1)}>Consent gate <small>access checked</small></span>
          <span className={state(2)}>Account signals <small>data fetched</small></span>
          <span className={state(3)}>Policy guardrails <small>rules applied</small></span>
        </div>
        <i className={progress >= 3 ? "is-flowing" : ""} />
        <div className="flow-tools">
          <div className={state(2)}><strong>Account tools</strong><small>Balances · transactions · EMI</small></div>
          <div className={state(3)}><strong>Decision engine</strong><small>Safe-to-save rules</small></div>
          <div className={state(3)}><strong>AI reasoning</strong><small>Explain, never transact</small></div>
        </div>
        <i className={progress >= 4 ? "is-flowing" : ""} />
        <div className={`flow-result ${state(4)}`}><strong>Answer</strong><small>Summary and next steps</small><span>{complete ? "Ready" : "Preparing"}</span></div>
      </div>
      <div className="flow-audit"><span>One trace for every chat turn</span><div><b>Audit log</b><b>Policy trace</b><b>Response time</b></div></div>
      <div className="flow-facts"><span><small>Consent</small><strong>Checked on</strong></span><span><small>Data access</small><strong>Read only</strong></span><span><small>Money movement</small><strong>None</strong></span><span><small>Audit status</small><strong>Recorded</strong></span></div>
      <div className="flow-events"><span>What the assistant did</span><b>REQUEST_UNDERSTOOD</b><b>CONSENT_CHECKED</b><b>DATA_REVIEWED</b><b>ANSWER_GENERATED</b></div>
    </div>
  );
}

function ChatTurnView({ accountBalance = "₹1,20,430", accountNumber = "4821 •••• •••• 1234", hideQuery = false, onRainyTransfer, onSupportUpdate, pockets = [], products = [], rainyBalance = 25500, turn }: { accountBalance?: string; accountNumber?: string; hideQuery?: boolean; onRainyTransfer?: (amount: number) => void; onSupportUpdate?: (turnId: number, field: "supportOptionsOpened" | "supportContactSelected" | "supportTransferConfirmed" | "supportTransferCancelled") => void; pockets?: Pocket[]; products?: Product[]; rainyBalance?: number; turn: ChatTurn }) {
  const complete = turn.visibleSteps >= thinkingSteps.length;
  const transferRequest = isTransferRequest(turn.query);
  const showInvestmentGuidance = !transferRequest && isInvestmentQuery(turn.query);
  const showLoanGuidance = !transferRequest && isLoanQuery(turn.query);
  const showPocketGuidance = !transferRequest && isPocketQuery(turn.query) && !isInvestmentQuery(turn.query);
  const turnPockets = turn.pocketsAtQuery ?? pockets;
  const matchingPockets = turnPockets.filter((pocket) => turn.query.toLowerCase().includes(pocket.name.toLowerCase()));
  const visiblePockets = matchingPockets.length ? matchingPockets : turnPockets;
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const [pocketView, setPocketView] = useState<"summary" | "details" | "transfer" | "success">("summary");
  const [transferCompleted, setTransferCompleted] = useState(false);
  const [supportDetailsOpen, setSupportDetailsOpen] = useState(false);
  const [supportRequestSent, setSupportRequestSent] = useState(false);
  const [supportTransferStatus, setSupportTransferStatus] = useState<"complete" | "cancelled" | null>(null);
  const [otpValue, setOtpValue] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [otpError, setOtpError] = useState("");
  const turnAccountBalance = turn.accountBalanceAtQuery ?? accountBalance;
  const turnRainyBalance = turn.rainyBalanceAtQuery ?? rainyBalance;
  const turnProducts = turn.productsAtQuery ?? products;
  const availableSavings = parseCurrencyAmount(turnAccountBalance);
  const suggestedTransferAmount = Math.min(MAX_RAINY_TOP_UP, Math.max(0, availableSavings - 50000), Math.max(0, 50000 - turnRainyBalance));
  const [supportTransferAmount, setSupportTransferAmount] = useState(suggestedTransferAmount);
  const personalLoan = turnProducts.find((product) => product.type === "Personal loan");
  const loanReserve = personalLoan ? PERSONAL_LOAN_EMI : 0;
  const fixedDepositAmount = Math.min(40000, Math.max(0, availableSavings - 50000 - loanReserve - suggestedTransferAmount));
  const fixedDepositInterest = Math.round(fixedDepositAmount * .0725 * .5);
  const fixedDepositMaturity = fixedDepositAmount + fixedDepositInterest;
  const currentFixedDeposits = turnProducts.find((product) => product.type === "Fixed deposits");
  const currentRecurringDeposit = turnProducts.find((product) => product.type === "Recurring deposit");
  const currentMutualFunds = turnProducts.find((product) => product.type === "Mutual funds");
  const currentPersonalLoan = personalLoan;
  const accountSuffix = accountNumber.match(/^\d{4}/)?.[0] ?? "4821";

  const renderPocketCard = (pocket: Pocket) => (
    <div className="rainy-pocket" key={pocket.name}>
      <div className="rainy-pocket-head"><span><Icon name="deposit" size={18} /></span><div><small>Current savings pocket balance</small><strong>{pocket.name}</strong><p>{pocket.goal > 0 ? `${Math.min(100, Math.round((pocket.balance / pocket.goal) * 100))}% of ${formatRupees(pocket.goal)} goal` : "Flexible savings pocket"}</p></div><b>{formatRupees(pocket.name === "Rainy Days" ? turnRainyBalance : pocket.balance)}</b></div>
      {pocket.name === "Rainy Days" && <div className="rainy-pocket-actions"><button onClick={() => setPocketView("details")} type="button">View details</button><button disabled={suggestedTransferAmount === 0 || transferCompleted} onClick={() => setPocketView("transfer")} type="button">{transferCompleted ? "Transfer complete" : suggestedTransferAmount === 0 ? "No top-up suggested" : `Transfer ${formatRupees(suggestedTransferAmount)}`} {!transferCompleted && <Icon name="arrow" size={14} />}</button></div>}
    </div>
  );

  function confirmTransfer() {
    if (otpAttempts >= 3) return;
    if (otpValue !== "123456") {
      const nextAttempts = otpAttempts + 1;
      setOtpAttempts(nextAttempts);
      setOtpError(nextAttempts >= 3 ? "Too many incorrect attempts. Cancel and start again to request a new demo code." : `That code doesn’t match. ${3 - nextAttempts} attempt${nextAttempts === 2 ? "" : "s"} left.`);
      return;
    }
    onRainyTransfer?.(suggestedTransferAmount);
    setTransferCompleted(true);
    setOtpError("");
    setPocketView("success");
  }

  function confirmSupportTransfer() {
    if (supportTransferAmount <= 0 || supportTransferStatus) return;
    onRainyTransfer?.(supportTransferAmount);
    setSupportTransferStatus("complete");
    onSupportUpdate?.(turn.id, "supportTransferConfirmed");
  }

  function cancelSupportTransfer() {
    if (supportTransferStatus) return;
    setSupportTransferStatus("cancelled");
    onSupportUpdate?.(turn.id, "supportTransferCancelled");
  }
  return (
    <article className="conversation-turn">
      {!hideQuery && <div className="workspace-user-message"><span>{turn.query}</span><small>{turn.timestamp}</small></div>}
      <div className={`thinking-card ${analysisExpanded ? "" : "is-analysis-collapsed"}`}>
        <div className="trace-tabs">
          <strong>{complete ? "Analysis complete" : `Step ${Math.min(turn.visibleSteps + 1, thinkingSteps.length)} of ${thinkingSteps.length}`}</strong>
          <button aria-expanded={analysisExpanded} aria-label={analysisExpanded ? "Hide thinking steps and secure flow" : "Show thinking steps and secure flow"} className="trace-toggle" onClick={() => setAnalysisExpanded((expanded) => !expanded)} type="button">
            <span>Thinking steps and secure flow</span><Icon name="chevron" size={16} />
          </button>
        </div>
        {analysisExpanded && <div className="analysis-combined">
          <div className="thinking-layout">
            <div className="thinking-summary"><b>0:00 to 0:09</b><strong>The query triggers a secure analysis</strong><p>Ask Equitas checks your financial context in a controlled sequence.</p></div>
            <div className="thinking-steps">
              {thinkingSteps.map((step, index) => (
                <div className={index < turn.visibleSteps ? "done" : index === turn.visibleSteps ? "active" : ""} key={step.title}>
                  <span>{index < turn.visibleSteps ? <Icon name="check" size={13} /> : index + 1}</span>
                  <b>{step.time}</b>
                  <div><strong>{step.title}</strong><small>{step.detail}</small></div>
                  <em>{index < turn.visibleSteps ? "Done" : index === turn.visibleSteps ? "Running" : "Queued"}</em>
                </div>
              ))}
            </div>
          </div>
          <TraceFlow complete={complete} progress={turn.visibleSteps} />
        </div>}
        {complete && (
          <div className="workspace-answer">
            <p>{turn.answer.replace("CLICK HERE", "")}</p>
            {transferRequest && <div className="rainy-pocket transfer-request-pocket">
              <div className="rainy-pocket-head"><span><Icon name="deposit" size={18} /></span><div><small>Current savings pocket balance</small><strong>Rainy Days</strong></div><b>{formatRupees(turnRainyBalance)}</b></div>
              <label className="transfer-request-amount">
                <span>Suggested top-up</span>
                <span className="transfer-request-input"><b>₹</b><input aria-label="Suggested Rainy Days top-up amount" inputMode="numeric" max={suggestedTransferAmount} min={0} onChange={(event) => setSupportTransferAmount(Math.min(suggestedTransferAmount, Math.max(0, Number(event.target.value) || 0)))} step={500} type="number" value={supportTransferAmount} /></span>
                <small>Up to {formatRupees(suggestedTransferAmount)} based on your available savings.</small>
              </label>
              <div className="rainy-pocket-actions">
                <button onClick={() => setPocketView("details")} type="button">View details</button>
                {!supportDetailsOpen && <button onClick={() => { setSupportDetailsOpen(true); onSupportUpdate?.(turn.id, "supportOptionsOpened"); }} type="button">Talk to a person</button>}
              </div>
              {supportDetailsOpen && <div className="support-conversation">
                <p className="support-assistant-message">An Equitas representative can guide you through the secure transfer process.</p>
                <div className="support-next-step"><div><small>Suggested next step</small><strong>Discuss a Rainy Days top-up</strong><span>Potential amount: {formatRupees(supportTransferAmount)}</span></div></div>
                <div className="support-actions">
                  {!supportRequestSent && <button className="support-primary-action" onClick={() => { setSupportRequestSent(true); onSupportUpdate?.(turn.id, "supportContactSelected"); }} type="button"><Icon name="phone" size={14} /> Talk to an agent</button>}
                  {supportRequestSent && <span className="support-request-status" role="status"><Icon name="check" size={14} /> Request noted</span>}
                  <button onClick={() => setSupportDetailsOpen(false)} type="button">Not now</button>
                </div>
                {supportRequestSent && supportTransferStatus === null && (
                  <div className="support-request-confirmation">
                    <strong>Confirm transfer</strong>
                    <p>Move {formatRupees(supportTransferAmount)} from Savings to Rainy Days?</p>
                    <div className="support-confirmation-balances"><span>Savings after transfer <b>{formatRupees(Math.max(0, availableSavings - supportTransferAmount))}</b></span><span>Rainy Days after transfer <b>{formatRupees(turnRainyBalance + supportTransferAmount)}</b></span></div>
                    <div className="support-actions">
                      <button className="support-primary-action" disabled={supportTransferAmount <= 0} onClick={confirmSupportTransfer} type="button">Confirm {formatRupees(supportTransferAmount)}</button>
                      <button onClick={cancelSupportTransfer} type="button">Cancel</button>
                    </div>
                  </div>
                )}
                {supportTransferStatus === "complete" && (
                  <div className="support-request-confirmation is-complete" role="status">
                    <strong><Icon name="check" size={14} /> Money moved</strong>
                    <p>{formatRupees(supportTransferAmount)} has been added to your Rainy Days pocket.</p>
                    <div className="support-confirmation-balances"><span>Savings balance <b>{formatRupees(Math.max(0, availableSavings - supportTransferAmount))}</b></span><span>Rainy Days balance <b>{formatRupees(turnRainyBalance + supportTransferAmount)}</b></span></div>
                  </div>
                )}
                {supportTransferStatus === "cancelled" && <p className="support-request-confirmation" role="status">Transfer cancelled. Your balances are unchanged.</p>}
              </div>}
            </div>}
            {showInvestmentGuidance && <div className="investment-context">
              <span><small>Available in savings</small><strong>{formatRupees(availableSavings)}</strong></span>
              <p>Keep at least ₹50,000 accessible{personalLoan ? ` and reserve ${formatRupees(loanReserve)} for your upcoming EMI` : ""}. Recommendations reflect your current account and existing investments.</p>
            </div>}
            {(showInvestmentGuidance || showLoanGuidance) && personalLoan && <div className="loan-context-card">
              <div><span><Icon name="card" size={16} /></span><small>Personal loan outstanding</small><strong>{personalLoan.amount.trim()}</strong></div>
              <p><span>Monthly EMI <b>{formatRupees(PERSONAL_LOAN_EMI)}</b></span><span>Due <b>{PERSONAL_LOAN_NEXT_DUE}</b></span><span>{PERSONAL_LOAN_REMAINING_INSTALLMENTS} instalments left</span></p>
            </div>}
            {showInvestmentGuidance && <div className="recommendation-card">
              <div className="recommendation-head"><span><Icon name="deposit" size={18} /></span><div><small>Suggested allocation</small><strong>{fixedDepositAmount ? "Additional Fixed Deposit" : "Keep your buffer liquid"}</strong></div><b>{formatRupees(fixedDepositAmount)}</b></div>
              {fixedDepositAmount > 0 && <div className="recommendation-facts"><span><small>Tenure</small><strong>6 months</strong></span><span><small>Interest rate</small><strong>7.25% p.a.</strong></span><span><small>Est. interest</small><strong>~{formatRupees(fixedDepositInterest)}</strong></span><span><small>Est. maturity</small><strong>~{formatRupees(fixedDepositMaturity)}</strong></span></div>}
              <p><Icon name="chart" size={14} /> Indicative estimate only; actual rates and returns depend on the selected deposit terms.</p>
            </div>}
            {showInvestmentGuidance && (currentFixedDeposits || currentRecurringDeposit || currentMutualFunds || currentPersonalLoan) && <div className="existing-investments">
              <div className="existing-investments-heading"><strong>Your current investments</strong><small>Suggestions build on what you already hold</small></div>
              <div className="existing-investment-list">
                {currentFixedDeposits && <div><span className="product-icon product-icon-gold"><Icon name="deposit" size={16} /></span><span><strong>Fixed deposits</strong><small>Current holding</small></span><b>{currentFixedDeposits.amount.trim()}</b></div>}
                {currentRecurringDeposit && <div><span className="product-icon product-icon-coral"><Icon name="repeat" size={16} /></span><span><strong>Recurring deposit</strong><small>{monthlyContribution(currentRecurringDeposit) ? `Continue ${monthlyContribution(currentRecurringDeposit)} instalments` : "Current holding"}</small></span><b>{currentRecurringDeposit.amount.trim()}</b></div>}
                {currentMutualFunds && <div><span className="product-icon product-icon-violet"><Icon name="fund" size={16} /></span><span><strong>Mutual funds</strong><small>Review before adding another SIP</small></span><b>{currentMutualFunds.amount.trim()}</b></div>}
                {currentPersonalLoan && <div><span className="product-icon product-icon-blue"><Icon name="card" size={16} /></span><span><strong>Personal loan</strong><small>{formatRupees(PERSONAL_LOAN_EMI)} EMI · due {PERSONAL_LOAN_NEXT_DUE}</small></span><b>{currentPersonalLoan.amount.trim()}</b></div>}
              </div>
            </div>}
            {showInvestmentGuidance && visiblePockets.filter((pocket) => pocket.name === "Rainy Days").map(renderPocketCard)}
            {showPocketGuidance && visiblePockets.map(renderPocketCard)}
            <div className="answer-disclaimer"><Icon name="lock" size={15} /> Equitas AI provides general information. Review the details before making a financial decision.</div>
          </div>
        )}
      </div>
      {pocketView !== "summary" && (
        <div className="rainy-modal-layer">
          <button aria-label="Close Rainy Days" className="rainy-modal-backdrop" onClick={() => setPocketView("summary")} type="button" />
          <section className="rainy-modal">
            <div className="rainy-modal-top">
            <div><span className="eyebrow">Savings pocket</span><h3>{pocketView === "transfer" ? "Confirm your transfer" : pocketView === "success" ? "Transfer complete" : "Rainy Days"}</h3></div>
              <button aria-label="Close" onClick={() => setPocketView("summary")} type="button"><Icon name="close" /></button>
            </div>
            {pocketView === "details" && (
              <>
                <div className="rainy-hero">
                  <div><span>Available in pocket</span><strong>₹{rainyBalance.toLocaleString("en-IN")}</strong><small>Goal ₹50,000</small></div>
                  <div className="rainy-progress"><progress max="50000" value={rainyBalance} /><small>{Math.min(100, Math.round((rainyBalance / 50000) * 100))}% of your goal</small></div>
                </div>
                <div className="rainy-modal-stats"><span><small>Monthly target</small><strong>₹4,150</strong></span><span><small>Interest earned</small><strong>₹42</strong></span><span><small>Auto-save</small><strong>Not enabled</strong></span></div>
                <div className="rainy-activity"><strong>Recent activity</strong><div><span><Icon name="arrow" size={15} /></span><p><b>Added to Rainy Days</b><small>15 October 2026</small></p><em>+ ₹3,000</em></div><div><span><Icon name="arrow" size={15} /></span><p><b>Added to Rainy Days</b><small>02 October 2026</small></p><em>+ ₹5,500</em></div></div>
                <div className="rainy-modal-actions"><button onClick={() => setPocketView("summary")} type="button">Close</button><button onClick={() => setPocketView("transfer")} type="button">Transfer money <Icon name="arrow" size={15} /></button></div>
              </>
            )}
            {pocketView === "transfer" && (
              <>
                <div className="transfer-route"><div><span><Icon name="bank" /></span><p><small>From</small><strong>Savings account</strong><b>•• {accountSuffix} · {formatRupees(availableSavings)} available</b></p></div><i /><div><span><Icon name="deposit" /></span><p><small>To</small><strong>Rainy Days</strong><b>Current balance {formatRupees(turnRainyBalance)}</b></p></div></div>
                <div className="transfer-amount"><span>Suggested transfer amount</span><div><b>₹</b><strong aria-label="Transfer amount">{suggestedTransferAmount.toLocaleString("en-IN")}</strong></div></div>
                <div className="transfer-demo-code"><strong>Demo code: 123456.</strong> This prototype has no real one-time password. In production, your bank would send a code to your registered device. Never share it with anyone, including the assistant.</div>
                <label className="transfer-otp-label" htmlFor={`rainy-otp-${turn.id}`}>One-time code</label>
                <input autoComplete="one-time-code" className="transfer-otp-input" id={`rainy-otp-${turn.id}`} inputMode="numeric" maxLength={6} onChange={(event) => { setOtpValue(event.target.value.replace(/\D/g, "").slice(0, 6)); setOtpError(""); }} placeholder="6 digits" value={otpValue} />
                <p className={`transfer-otp-hint ${otpError ? "has-error" : ""}`} role={otpError ? "alert" : undefined}>{otpError || `${3 - otpAttempts} attempt${otpAttempts === 1 ? "" : "s"} left. Never share this code with anyone, including the assistant.`}</p>
                <div className="rainy-modal-actions"><button onClick={() => setPocketView("summary")} type="button">Cancel</button><button disabled={otpValue.length !== 6 || otpAttempts >= 3} onClick={confirmTransfer} type="button">Confirm transfer <Icon name="arrow" size={15} /></button></div>
              </>
            )}
            {pocketView === "success" && (
              <div className="transfer-success"><span><Icon name="check" size={30} /></span><h4>₹{suggestedTransferAmount.toLocaleString("en-IN")} moved successfully</h4><p>Your Rainy Days pocket now has ₹{rainyBalance.toLocaleString("en-IN")} and is {Math.min(100, Math.round((rainyBalance / 50000) * 100))}% closer to its goal.</p><button onClick={() => setPocketView("summary")} type="button">Done</button></div>
            )}
          </section>
        </div>
      )}
    </article>
  );
}

function ChatPanel({
  accountBalance,
  accountNumber,
  onRainyTransfer,
  onSupportUpdate,
  pockets,
  products,
  rainyBalance,
  turns,
  setTurns,
  user,
}: {
  accountBalance: string;
  accountNumber: string;
  onRainyTransfer: (amount: number) => void;
  onSupportUpdate: (turnId: number, field: "supportOptionsOpened" | "supportContactSelected" | "supportTransferConfirmed" | "supportTransferCancelled") => void;
  pockets: Pocket[];
  products: Product[];
  rainyBalance: number;
  turns: ChatTurn[];
  setTurns: Dispatch<SetStateAction<ChatTurn[]>>;
  user: MockUser;
}) {
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [minimizing, setMinimizing] = useState(false);
  const timers = useRef<number[]>([]);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  useEffect(() => {
    responseRef.current?.scrollTo({
      top: responseRef.current.scrollHeight,
      behavior: expanded ? "smooth" : "instant",
    });
  }, [expanded, turns]);

  function runTurn(query: string, answer: string, link = false) {
    const id = Date.now() + Math.random();
    const timestamp = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(new Date());
    setMinimizing(false);
    setExpanded(true);
    setTurns((current) => [...current, { id, query, answer, link, visibleSteps: 0, timestamp, accountBalanceAtQuery: accountBalance, rainyBalanceAtQuery: rainyBalance, pocketsAtQuery: pockets, productsAtQuery: products }]);
    thinkingSteps.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        setTurns((current) => current.map((turn) => turn.id === id ? { ...turn, visibleSteps: index + 1 } : turn));
      }, 500 + index * 650);
      timers.current.push(timer);
    });
  }

  function ask(topic: string) {
    runTurn(topic, createInvestmentAnswer(topic, products, rainyBalance, pockets));
  }

  function send(event: FormEvent) {
    event.preventDefault();
    if (!value.trim()) return;
    const question = value.trim();
    setValue("");
    runTurn(question, createInvestmentAnswer(question, products, rainyBalance, pockets), true);
  }

  function toggleExpanded() {
    if (!expanded) {
      setMinimizing(false);
      setExpanded(true);
      return;
    }
    setMinimizing(true);
    const timer = window.setTimeout(() => {
      setExpanded(false);
      setMinimizing(false);
    }, 380);
    timers.current.push(timer);
  }

  return (
    <aside className={`chat-panel ${expanded ? "is-expanded" : ""} ${minimizing ? "is-minimizing" : ""}`}>
      <div className="chat-header">
        <span className="assistant-avatar"><Icon name="bank" size={20} /></span>
        <div><strong>Ask Equitas AI</strong><span>Plan · Save · Invest · Get answers</span></div>
        <div className="chat-header-actions"><small>ONLINE</small><button aria-label={expanded ? "Minimize AI chat" : "Maximize AI chat"} onClick={toggleExpanded} type="button"><Icon name={expanded ? "minimize" : "expand"} size={18} /></button></div>
      </div>
      <div className="chat-body">
        {turns.length === 0 && <div className="chat-intro">
          <div className="chat-bubble chat-bot">
            Hi {user.firstName}! I’m AIdy, your virtual banking assistant. Try one of these questions to get started.
          </div>
        </div>}
        <div className="chat-messages chat-followup" ref={responseRef}>
          {turns.map((turn) =>           <ChatTurnView accountBalance={accountBalance} accountNumber={accountNumber} key={turn.id} onRainyTransfer={onRainyTransfer} onSupportUpdate={onSupportUpdate} pockets={pockets} products={products} rainyBalance={rainyBalance} turn={turn} />)}
          {turns.length > 0 && turns[turns.length - 1].visibleSteps >= thinkingSteps.length && (
            <div className="chat-topics chat-topics-followup">
              <div className="chat-suggestions-heading"><span>You could also ask</span></div>
              {suggestedMessages.map(({ icon, query }) => (
                <button key={query} onClick={() => ask(query)} type="button">
                  <span><Icon name={icon} size={16} /></span>
                  <strong>{query}</strong>
                  <Icon name="chevron" size={15} />
                </button>
              ))}
            </div>
          )}
        </div>
        {turns.length === 0 && (
          <div className="chat-topics">
            <div className="chat-suggestions-heading"><span>Suggested questions</span><small>Based on your accounts</small></div>
            {suggestedMessages.map(({ icon, query }) => (
              <button key={query} onClick={() => ask(query)} type="button">
                <span><Icon name={icon} size={16} /></span>
                <strong>{query}</strong>
                <Icon name="chevron" size={15} />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="compose-wrap">
        <form className="chat-compose" onSubmit={send}>
          <input aria-label="Ask Equitas AI" onChange={(event) => setValue(event.target.value)} placeholder="Ask about your money..." value={value} />
          <button aria-label="Send message" type="submit"><Icon name="arrow" size={19} /></button>
        </form>
      </div>
    </aside>
  );
}

function ConversationHistoryPage({ accountBalance, accountNumber, onClose, pockets, products, rainyBalance, turns }: { accountBalance: string; accountNumber: string; onClose: () => void; pockets: Pocket[]; products: Product[]; rainyBalance: number; turns: ChatTurn[] }) {
  const [selectedConversation, setSelectedConversation] = useState<ChatTurn | null>(null);

  return (
    <section aria-label="Conversation history" aria-modal="true" className="history-fullscreen" role="dialog">
      <header className="history-fullscreen-header">
        <button className="history-fullscreen-back" onClick={() => selectedConversation ? setSelectedConversation(null) : onClose()} type="button">
          <Icon name="back" size={16} /> {selectedConversation ? "Back to conversations" : "Back to dashboard"}
        </button>
        <Logo />
        <button aria-label="Close conversation history" className="icon-button" onClick={onClose} type="button"><Icon name="close" /></button>
      </header>
      <main className="history-fullscreen-content">
        <div className="history-fullscreen-title">
          <span className="eyebrow">Ask Equitas AI</span>
          <h1>Conversation history</h1>
          <p>Review previous questions, guidance, and account insights.</p>
        </div>
        <ChatHistory accountBalance={accountBalance} accountNumber={accountNumber} pockets={pockets} products={products} rainyBalance={rainyBalance} selected={selectedConversation} setSelected={setSelectedConversation} showAll turns={turns} />
      </main>
    </section>
  );
}

const notifications = [
  { category: "Account", title: "Salary credited", text: "₹50,000 credited to your Savings Account XXXX1234.", time: "10:32 AM", icon: "arrow" as IconName, tone: "green" },
  { category: "Payments", title: "Upcoming bill payment", text: "Your electricity bill of ₹2,450 is due on 20 Oct 2026.", time: "Yesterday", icon: "repeat" as IconName, tone: "coral" },
  { category: "Payments", title: "High spend alert", text: "Food spending is 25% higher than your average.", time: "Yesterday", icon: "card" as IconName, tone: "violet" },
  { category: "Offers", title: "New FD offer", text: "Get up to 7.25% p.a. on Fixed Deposits.", time: "12 Oct", icon: "deposit" as IconName, tone: "gold" },
  { category: "Account", title: "Security alert", text: "A new device logged in to your account.", time: "10 Oct", icon: "shield" as IconName, tone: "blue" },
  { category: "Updates", title: "Guidance from Equitas AI", text: "Based on your spending, you could save ₹1,300 per month.", time: "8 Oct", icon: "bank" as IconName, tone: "blue" },
  { category: "Offers", title: "Insurance made simple", text: "Explore protection plans suited to your family.", time: "6 Oct", icon: "shield" as IconName, tone: "blue" },
  { category: "Updates", title: "Statement available", text: "Your September account statement is ready.", time: "2 Oct", icon: "mail" as IconName, tone: "blue" },
];

function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState("All");
  const [readItems, setReadItems] = useState<string[]>([]);
  const tabs = ["All", "Account", "Payments", "Offers", "Updates"];
  const visibleNotifications = tab === "All" ? notifications : notifications.filter((item) => item.category === tab);
  return (
    <>
      <button aria-label="Close notifications" className={`drawer-overlay ${open ? "is-open" : ""}`} onClick={onClose} type="button" />
      <aside className={`notification-drawer ${open ? "is-open" : ""}`}>
        <div className="notification-head">
          <div><span className="eyebrow">Stay informed</span><h2>Notifications</h2></div>
          <button aria-label="Close notifications" className="icon-button" onClick={onClose} type="button"><Icon name="close" /></button>
        </div>
        <div className="notification-tabs">
          {tabs.map((item) => {
            const count = item === "All" ? notifications.length : notifications.filter((notification) => notification.category === item).length;
            return <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)} type="button">{item} ({count})</button>;
          })}
        </div>
        <div className="notification-list">
          {visibleNotifications.map((item) => (
            <button className={`notification-row ${readItems.includes(item.title) ? "is-read" : ""}`} key={item.title} onClick={() => setReadItems((current) => current.includes(item.title) ? current : [...current, item.title])} type="button">
              <span className={`product-icon product-icon-${item.tone}`}><Icon name={item.icon} size={19} /></span>
              <span><strong>{item.title}</strong><small>{item.text}</small></span>
              <time>{item.time}<i /></time>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

const expensePeriods = [
  {
    label: "This month",
    total: "₹42,350",
    chartClass: "donut-current",
    comparison: "9% higher than September",
    categories: [
      ["Food & dining", "₹12,340", "29%", "coral"],
      ["Shopping", "₹8,520", "20%", "blue"],
      ["Travel", "₹7,260", "17%", "violet"],
      ["Bills & utilities", "₹6,300", "15%", "gold"],
      ["Others", "₹7,930", "19%", "slate"],
    ],
    insight: "Food & dining is your highest expense at ₹12,340, up 18% from September. Setting a ₹10,500 monthly limit could save around ₹1,840.",
  },
  {
    label: "September",
    total: "₹38,920",
    chartClass: "donut-september",
    comparison: "7% higher than August",
    categories: [
      ["Shopping", "₹10,500", "27%", "coral"],
      ["Food & dining", "₹8,940", "23%", "blue"],
      ["Bills & utilities", "₹7,100", "18%", "violet"],
      ["Travel", "₹5,450", "14%", "gold"],
      ["Others", "₹6,930", "18%", "slate"],
    ],
    insight: "Shopping was September’s highest expense at ₹10,500, 31% above August. A weekly shopping budget could have reduced spending by about ₹2,100.",
  },
  {
    label: "August",
    total: "₹10,00,00,00,00,000",
    chartClass: "donut-august",
    comparison: "4% lower than July",
    categories: [
      ["Bills & utilities", "₹9,99,99,90,500", "26%", "coral"],
      ["Food & dining", "₹8,040", "22%", "blue"],
      ["Shopping", "₹8,000", "22%", "violet"],
      ["Travel", "₹4,750", "13%", "gold"],
      ["Others", "₹6,250", "17%", "slate"],
    ],
    insight: "Bills & utilities were August’s highest expense at ₹9,500 due to an annual payment. Regular monthly expenses were otherwise 4% lower than July.",
  },
];

function ExpenseCard({ useLargeValues = false }: { useLargeValues?: boolean }) {
  const [periodIndex, setPeriodIndex] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const basePeriod = expensePeriods[periodIndex];
  const period = useLargeValues && periodIndex === 0
    ? {
        ...basePeriod,
        total: "₹10,00,00,00,00,000",
        comparison: "12% higher than September",
        categories: [
          ["Food & dining", "₹2,90,00,00,00,000", "29%", "coral"],
          ["Shopping", "₹2,00,00,00,00,000", "20%", "blue"],
          ["Travel", "₹1,70,00,00,00,000", "17%", "violet"],
          ["Bills & utilities", "₹1,50,00,00,00,000", "15%", "gold"],
          ["Others", "₹1,90,00,00,00,000", "19%", "slate"],
        ],
        insight: "Food & dining is the highest expense in this large-value mock account. The complete amounts remain available by hovering over any shortened value.",
      }
    : basePeriod;
  const amountFontSize = Math.max(10, Math.min(17, 210 / period.total.length));
  return (
    <div className="expense-card panel">
      <div className="block-heading">
        <div><span className="eyebrow">Monthly activity</span><h2>Your expenses</h2></div>
        <div className="expense-filter">
          <button className="filter-button" onClick={() => setFilterOpen(!filterOpen)} type="button">
            {period.label} <Icon name="chevron" size={14} />
          </button>
          {filterOpen && (
            <div className="expense-filter-menu">
              {expensePeriods.map((option, index) => (
                <button
                  className={index === periodIndex ? "active" : ""}
                  key={option.label}
                  onClick={() => { setPeriodIndex(index); setFilterOpen(false); }}
                  type="button"
                >
                  <span>{option.label}</span>
                  {index === periodIndex && <Icon name="check" size={15} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="expense-scroll-content">
        <div className="expense-body">
          <div className="expense-total-card" key={period.label}>
            <div className="expense-chart-summary">
              <div><span>Total spent</span><strong style={{ fontSize: `${amountFontSize}px` }} title={period.total}>{period.total}</strong></div>
              <small><Icon name="chart" size={13} /> {period.comparison}</small>
            </div>
          </div>
          <div className="legend">
            {period.categories.map(([name, amount, percent, color]) => (
              <div key={name}>
                <i className={`dot-${color}`} />
                <span className="legend-name">{name}</span>
                <strong className={amount.length > 12 ? "long-legend-value" : ""} title={amount}>{amount}</strong>
                <small>{percent}</small>
                <span aria-label={`${name}: ${percent} of expenses`} className="legend-progress"><span style={{ width: percent }} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="expense-ai">
          <span className="expense-ai-icon"><Icon name="chart" size={17} /></span>
          <div>
            <span>AI spending insight · {period.comparison}</span>
            <p>{period.insight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ description, icon, label, tone }: { description: string; icon: IconName; label: string; tone: "cyan" | "pink" | "green" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={expanded ? "is-expanded" : ""}>
      <span className={`insight-icon ${tone}`}><Icon name={icon} /></span>
      <div>
        <small>{label}</small>
        <p>{description}</p>
        <button aria-expanded={expanded} onClick={() => setExpanded((current) => !current)} type="button">{expanded ? "Less" : "More"}</button>
      </div>
    </article>
  );
}

function Dashboard({ onLogout, setChatTurns, chatTurns, user }: { onLogout: () => void; setChatTurns: Dispatch<SetStateAction<ChatTurn[]>>; chatTurns: ChatTurn[]; user: MockUser }) {
  const largeProductAmounts = [
    "₹ 10,00,00,00,00,000",
    "₹ 8,75,00,00,000",
    "₹ 12,30,00,000",
    "₹ 3,23,22,00,000",
    "₹ 2,04,000",
    "₹ 25,00,00,000",
  ];
  const [profileOpen, setProfileOpen] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [profileDetail, setProfileDetail] = useState<string | null>(null);
  const [scrollProfileToProducts, setScrollProfileToProducts] = useState(false);
  const [rainyBalance, setRainyBalance] = useState(25500);
  const [customPockets, setCustomPockets] = useState<Pocket[]>([{ name: "Travel", balance: 0, goal: 30000 }]);
  const initialSavingsBalance = user.id === "444444444"
    ? parseCurrencyAmount(largeProductAmounts[0])
    : parseCurrencyAmount(allProducts[0].amount);
  const [savingsBalance, setSavingsBalance] = useState(initialSavingsBalance);
  const availableProducts = allProducts.slice(0, user.productCount).map((product, index) => {
    if (index === 0) return { ...product, amount: `₹ ${savingsBalance.toLocaleString("en-IN")}` };
    return user.id === "444444444" ? { ...product, amount: largeProductAmounts[index] } : product;
  });
  const userProducts = availableProducts.some((product) => product.type === "Personal loan")
    ? availableProducts
    : [...availableProducts, ...allProducts.filter((product) => product.type === "Personal loan")];
  const profileProducts = userProducts;
  const pockets: Pocket[] = [{ name: "Rainy Days", balance: rainyBalance, goal: 50000 }, ...customPockets];

  function openUpcomingActivity(type: string) {
    setProfileDetail(type);
    setProfileOpen(true);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Logo />
        <div className="header-actions">
          <button aria-label="Notifications" className="icon-button notification" onClick={() => setNotificationsOpen(true)} type="button"><Icon name="bell" /><i /></button>
          <button className="profile-trigger" onClick={() => setProfileOpen(true)} type="button">
            <span className="avatar"><Icon name="user" size={19} /></span>
            <span><strong>{user.name}</strong><small>View profile</small></span>
            <Icon name="chevron" size={17} />
          </button>
        </div>
      </header>

      <main className="dashboard">
        <div className="dashboard-layout">
          <div className="dashboard-main">
            <section className="welcome-row">
              <div className="welcome-message"><h1>Good morning, {user.firstName}!</h1><p>Here’s your financial snapshot. Ask AIdy for anything else.</p></div>
              <span className="welcome-date">Wednesday, 15 October</span>
              <button className="mobile-profile" onClick={() => setProfileOpen(true)} type="button"><Icon name="menu" /></button>
            </section>
            <section className="top-grid">
              <ProductCard index={productIndex} items={userProducts} onChange={setProductIndex} />
              <div className={`quick-products products-count-${Math.min(userProducts.length, 4)}`}>
                <div className="block-heading">
                  <div><span className="eyebrow">At a glance</span><h2>Your products</h2></div>
                  <div className="product-count">
                    <span>{userProducts.length} linked</span>
                    {userProducts.length > 4 && <button onClick={() => { setProfileDetail(null); setScrollProfileToProducts(true); setProfileOpen(true); }} type="button">+{userProducts.length - 4} more</button>}
                  </div>
                </div>
                <div className="quick-product-grid">
                  {userProducts.slice(0, 4).map((product, index) => (
                    <button
                      className={index === productIndex ? "selected" : ""}
                      key={product.type}
                      onClick={() => { setProductIndex(index); setProfileDetail(product.type); setProfileOpen(true); }}
                      type="button"
                    >
                      <span className={`product-icon product-icon-${product.tone}`}><Icon name={product.icon} /></span>
                      <span><small>{product.type}</small><strong className={product.amount.length > 12 ? "long-product-value" : ""} title={product.amount}>{product.amount}</strong></span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
            <section className="content-grid">
              <ExpenseCard useLargeValues={user.id === "444444444"} />
              <div className="upcoming-card panel">
                <div className="block-heading">
                  <div><span className="eyebrow">Coming up</span><h2>Payments & maturities</h2></div>
                  <span className="upcoming-count">Next due first</span>
                </div>
                <div className="upcoming-scroll-content">
                  <UpcomingActivities onSelect={openUpcomingActivity} products={userProducts} />
                </div>
              </div>
            </section>
            <section className="insights">
              <div className="block-heading"><div><span className="eyebrow">Made for you</span><h2>Smart money insights</h2></div><span className="insight-badge">Today</span></div>
              <div className="insight-grid">
                <InsightCard description="Saving half your travel spend could add ₹4,800 to an FD while helping you build a stronger monthly emergency buffer." icon="chart" label="SPENDING INSIGHT" tone="cyan" />
                <InsightCard description="A weekly shopping limit could free up ₹2,130 monthly and keep discretionary spending within your preferred budget." icon="card" label="SAVINGS TIP" tone="pink" />
                <InsightCard description="A one-year fixed deposit of ₹50,000 may return about ₹3,250 based on the currently displayed indicative rate." icon="fund" label="GROWTH" tone="green" />
              </div>
            </section>
          </div>
          <ChatPanel accountBalance={userProducts[0]?.amount ?? "₹1,20,430"} accountNumber={userProducts[0]?.number ?? "4821 •••• •••• 1234"} onRainyTransfer={(amount) => { setRainyBalance((current) => current + amount); setSavingsBalance((current) => Math.max(0, current - amount)); }} onSupportUpdate={(turnId, field) => setChatTurns((current) => current.map((turn) => turn.id === turnId ? { ...turn, [field]: true } : turn))} pockets={pockets} products={userProducts} rainyBalance={rainyBalance} setTurns={setChatTurns} turns={chatTurns} user={user} />
        </div>
      </main>
      <ProfileDrawer
        initialDetail={profileDetail}
        key={`${user.id}-${profileDetail ?? "profile"}`}
        open={profileOpen}
        scrollToProducts={scrollProfileToProducts}
        onProductsScrollComplete={() => setScrollProfileToProducts(false)}
        onClose={() => { setProfileOpen(false); setProfileDetail(null); }}
        onExpandHistory={() => setHistoryExpanded(true)}
        onPocketCreated={(name, goal) => {
          setCustomPockets((current) => [...current, { name, goal, balance: 0 }]);
          setProfileDetail("My pockets");
        }}
        onLogout={onLogout}
        pockets={pockets}
        products={profileProducts}
        rainyBalance={rainyBalance}
        turns={chatTurns}
        user={user}
      />
      {historyExpanded && <ConversationHistoryPage accountBalance={userProducts[0]?.amount ?? "₹1,20,430"} accountNumber={userProducts[0]?.number ?? "4821 •••• •••• 1234"} onClose={() => setHistoryExpanded(false)} pockets={pockets} products={userProducts} rainyBalance={rainyBalance} turns={chatTurns} />}
      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [conversationsByCustomer, setConversationsByCustomer] = useState<Record<string, ChatTurn[]>>({});

  if (user) {
    const setCustomerTurns: Dispatch<SetStateAction<ChatTurn[]>> = (action) => {
      setConversationsByCustomer((current) => ({
        ...current,
        [user.id]: typeof action === "function" ? action(current[user.id] ?? []) : action,
      }));
    };
    return <Dashboard chatTurns={conversationsByCustomer[user.id] ?? []} onLogout={() => setUser(null)} setChatTurns={setCustomerTurns} user={user} />;
  }
  if (adminOpen) return <AdminWorkspace onBack={() => setAdminOpen(false)} conversationsByCustomer={conversationsByCustomer} />;
  return <Login onAdmin={() => setAdminOpen(true)} onLogin={setUser} />;
}
