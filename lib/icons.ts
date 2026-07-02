import {
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Layout,
  Network,
  ShieldCheck,
  Zap,
  CloudUpload,
  Rocket,
  Cpu,
  Globe,
  Terminal,
  GitBranch,
  Boxes,
  Palette,
  Smartphone,
  Lock,
  Gauge,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps an icon NAME (string, as stored in the database) to its Lucide
 * component. Client components look icons up here so the database can hold
 * plain serializable strings instead of React components.
 */
export const iconMap: Record<string, LucideIcon> = {
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Layout,
  Network,
  ShieldCheck,
  Zap,
  CloudUpload,
  Rocket,
  Cpu,
  Globe,
  Terminal,
  GitBranch,
  Boxes,
  Palette,
  Smartphone,
  Lock,
  Gauge,
};

/** Names offered in the admin icon picker. */
export const iconNames = Object.keys(iconMap);

/** Resolve an icon name to a component, with a safe fallback. */
export function getIcon(name: string | null | undefined): LucideIcon {
  return (name && iconMap[name]) || Server;
}
