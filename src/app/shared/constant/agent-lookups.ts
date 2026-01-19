import { ICurrency, IAgentProfileType } from '../../types/agent/agent.type';

export const CurrencyUIMap: Record<
  ICurrency,
  { label: string; class: string }
> = {
  THB: {
    label: 'THB',
    class: 'bg-emerald-100 text-emerald-700',
  },
  USD: {
    label: 'USD',
    class: 'bg-blue-100 text-blue-700',
  },
  INR: {
    label: 'INR',
    class: 'bg-orange-100 text-orange-700',
  },
  CNY: {
    label: 'CNY',
    class: 'bg-red-100 text-red-700',
  },
};

export const AgentTypeUIMap: Record<
  IAgentProfileType,
  { label: string; class: string }
> = {
  Internal: {
    label: 'INTERNAL',
    class: 'bg-blue-200 text-blue-800',
  },
  OTA: {
    label: 'OTA',
    class: 'bg-yellow-100 text-yellow-800',
  },
};
