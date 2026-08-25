import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { MagField } from "@/components/magnitude/MagField";
import { COLOR_A, COLOR_B } from "@/lib/palette";
import { darkCanvas } from "./decorators";

const meta = {
  title: "Magnitude/MagField",
  component: MagField,
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => darkCanvas(Story, { maxWidth: 320 })],
} satisfies Meta<typeof MagField>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({
  label,
  color,
  initial,
}: {
  label: string;
  color: string;
  initial: number;
}) {
  const [value, setValue] = useState(initial);
  return (
    <MagField label={label} color={color} value={value} onChange={setValue} />
  );
}

export const EventA: Story = {
  args: {
    label: "Event A",
    color: COLOR_A,
    value: 5,
    onChange: () => {},
  },
  render: () => (
    <Controlled label="Event A" color={COLOR_A} initial={5} />
  ),
};

export const EventB: Story = {
  args: {
    label: "Event B",
    color: COLOR_B,
    value: 7,
    onChange: () => {},
  },
  render: () => (
    <Controlled label="Event B" color={COLOR_B} initial={7} />
  ),
};
