import Link from 'next/link';

type SidebarItem = {
  href: string;
  label: string;
};

type HelpSidebarProps = {
  items: readonly SidebarItem[];
};

export default function HelpSidebar({ items }: HelpSidebarProps) {
  return (
    <aside className="help-sidebar" aria-label="Guide navigation">
      <div className="help-sidebar-sticky">
        <nav className="help-sidebar-panel" aria-label="On this page">
          <div className="help-sidebar-heading">
            <span className="help-sidebar-dot" aria-hidden="true" />
            <div>
              <p>On this page</p>
              <span>Jump to a section</span>
            </div>
          </div>

          <ol className="help-sidebar-toc">
            {items.map((item, index) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span className="help-sidebar-index">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>

          <Link className="help-sidebar-back" href="/help/">
            <span aria-hidden="true">←</span>
            Back to Help
          </Link>
        </nav>
      </div>
    </aside>
  );
}
