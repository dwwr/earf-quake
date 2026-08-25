import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChipButton } from "@/components/ui/ChipButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { darkCanvas } from "./decorators";

const meta = {
  title: "UI/ChipButton",
  component: ChipButton,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 420 })],
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "ΔM = 1" },
};

export const PresetRow: Story = {
  args: { children: "ΔM = 1" },
  render: () => (
    <div className="flex flex-col gap-3">
      <SectionLabel>Presets</SectionLabel>
      <div className="flex flex-wrap gap-2">
        <ChipButton>ΔM = 1</ChipButton>
        <ChipButton>M5 vs M7</ChipButton>
        <ChipButton>M7 vs M9</ChipButton>
        <ChipButton>Swap A ↔ B</ChipButton>
      </div>
    </div>
  ),
};
