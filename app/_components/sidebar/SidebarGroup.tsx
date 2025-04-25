import Link from "next/link";
import { ReactElement, useMemo } from "react";
import Icon from "../Icon";

type TLink = {
  href: string;
};

type TButton = {
  onClick: () => void;
};

type TGroupItem = {
  name: string;
  iconName?: string;
} & (TLink | TButton);

interface Props {
  title?: string;
  items: TGroupItem[];
}

export default function SidebarGroup({ title, items }: Props) {
  const styling = useMemo(
    () => ({
      group: "my-[var(--space-2)]",
      itemLayout:
        "flex justify-between items-center gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-1)]",
      icon: "",

      caption() {
        return [this.itemLayout, "text-[var(--accent-9)]"].join(" ");
      },
      item() {
        return [this.itemLayout, "hover:bg-[var(--accent-3)]"].join(" ");
      },
    }),
    []
  );

  return (
    <figure className={styling.group}>
      {title && <figcaption className={styling.caption()}>{title}</figcaption>}
      <ul>
        {items.map(({ name, iconName, ...rest }, index) => {
          let interactiveEl: ReactElement;
          const iconEl = iconName && (
            <Icon
              className={styling.icon}
              icon={iconName}
              width={18}
              height={18}
            />
          );

          if ("href" in rest) {
            const { href } = rest;

            interactiveEl = (
              <Link href={href} className={styling.item()}>
                {name}
                {iconEl}
              </Link>
            );
          } else if ("onClick" in rest) {
            const { onClick } = rest;

            interactiveEl = (
              <button className={styling.item()} onClick={onClick}>
                {name}
                {iconEl}
              </button>
            );
          } else return null;

          return <li key={index}>{interactiveEl}</li>;
        })}
      </ul>
    </figure>
  );
}
