import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { darkCanvas } from "./decorators";

const meta = {
  title: "UI/SectionLabel",
  component: SectionLabel,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 420 })],
  args: { children: "How much bigger is B than A?" },
} satisfies Meta<typeof SectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stack: Story = {
  args: { children: "Shared log scale — energy outruns amplitude" },
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionLabel>Shared log scale — energy outruns amplitude</SectionLabel>
      <SectionLabel>Two slopes vs ΔM</SectionLabel>
      <SectionLabel>Event B alone (not a ratio)</SectionLabel>
    </div>
  ),
};
