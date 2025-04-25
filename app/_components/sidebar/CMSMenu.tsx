import SidebarGroup from "./SidebarGroup";

export default function CMSMenu() {
  return (
    <SidebarGroup
      title="CMS"
      items={[
        {
          name: "TODO: Events",
          href: "/cms/events",
          iconName: "streamline:blank-calendar",
        },
        {
          name: "TODO: Users",
          href: "/cms/users",
          iconName: "streamline:user-multiple-group",
        },
      ]}
    />
  );
}
