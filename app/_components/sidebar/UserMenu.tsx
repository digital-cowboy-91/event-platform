import SidebarGroup from "./SidebarGroup";

export default function UserMenu() {
  return (
    <SidebarGroup
      title="User"
      items={[
        {
          name: "TODO: Profile",
          href: "/my/profile",
          iconName: "streamline:user-profile-focus",
        },
        {
          name: "TODO: Tickets",
          href: "/my/tickets",
          iconName: "streamline:tickets",
        },
      ]}
    />
  );
}
