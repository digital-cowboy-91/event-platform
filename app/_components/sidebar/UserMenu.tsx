import SidebarGroup from "./SidebarGroup";

export default function UserMenu() {
  return (
    <SidebarGroup
      title="User"
      items={[
        {
          name: "Profile",
          href: "/my/profile",
          iconName: "streamline:user-profile-focus",
        },
        {
          name: "Tickets",
          href: "/my/tickets",
          iconName: "streamline:tickets",
        },
      ]}
    />
  );
}
