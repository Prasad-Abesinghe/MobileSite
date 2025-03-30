import {
  Sun,
  Moon,
  Laptop,
  Github,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Package,
  Truck,
  Clock,
  XCircle,
  Smartphone,
  Tablet,
  Headphones,
  Watch,
  Camera,
  Battery,
  Wifi,
  Bluetooth,
  CreditCard,
  Shield,
  Star,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  Trash,
  Plus,
  Minus,
  Loader2,
  Monitor,
  Cpu,
  HardDrive,
  Database,
} from "lucide-react";
import { IconProps } from "lucide-react";

export const Icons = {
  sun: Sun,
  moon: Moon,
  logo: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  twitter: Twitter,
  gitHub: Github,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  chevronRight: ChevronRight,
  checkCircle: CheckCircle2,
  package: Package,
  truck: Truck,
  clock: Clock,
  xCircle: XCircle,
  smartphone: Smartphone,
  tablet: Tablet,
  headphones: Headphones,
  watch: Watch,
  camera: Camera,
  battery: Battery,
  wifi: Wifi,
  bluetooth: Bluetooth,
  creditCard: CreditCard,
  shield: Shield,
  star: Star,
  heart: Heart,
  shoppingCart: ShoppingCart,
  user: User,
  logOut: LogOut,
  settings: Settings,
  bell: Bell,
  search: Search,
  filter: Filter,
  eye: Eye,
  edit: Edit,
  trash: Trash,
  plus: Plus,
  minus: Minus,
  spinner: Loader2,
  screen: Monitor,
  processor: Cpu,
  ram: Database,
  storage: HardDrive,
  google: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  ),
  facebook: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
      <path
        fill="#3F51B5"
        d="M42 37a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5h26a5 5 0 0 1 5 5v26z"
      />
      <path
        fill="#FFF"
        d="M34.368 25H31v13h-5V25h-3v-4h3v-2.41c.002-3.508 1.459-5.59 5.592-5.59H35v4h-2.287C31.104 17 31 17.6 31 18.723V21h4l-.632 4z"
      />
    </svg>
  ),
};
