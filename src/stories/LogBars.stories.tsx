import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogBars } from "@/components/magnitude/LogBars";
import { energyRatio, amplitudeRatio } from "@/lib/magnitude";
import { darkCanvas } from "./decorators";

type StoryArgs = { delta: number };

const meta = {
  title: "Magnitude/LogBars",
  parameters: { layout: "fullscreen" },
  args: { delta: 2 },
  argTypes: {
    delta: { control: { type: "range", min: -4, max: 4, step: 0.1 } },
  },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 480 })],
  render: ({ delta }: StoryArgs) => (
    <LogBars
      ampRatio={amplitudeRatio(0, delta)}
      energyRatio={energyRatio(0, delta)}
    />
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoUnits: Story = {};

export const OneUnit: Story = { args: { delta: 1 } };

export const NegativeDelta: Story = { args: { delta: -1 } };

export const NearEqual: Story = { args: { delta: 0.2 } };
