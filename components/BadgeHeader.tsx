type BadgeHeaderProps = {
  title: string;
  subtitle: string;
};

export function BadgeHeader({ title, subtitle }: BadgeHeaderProps) {
  return (
    <header className="card">
      <div className="row">
        <div>
          <p className="subtle" style={{ marginTop: 0 }}>
            Base Mini App
          </p>
          <h2 className="title-main" style={{ marginTop: 2 }}>
            {title}
          </h2>
          <p className="subtle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}

