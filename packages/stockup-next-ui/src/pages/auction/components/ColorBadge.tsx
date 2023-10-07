export function lightCSSColor(color: string) {
  switch (color) {
    case "green":
      return "#00a878";
    case "blue":
      return "#004e7d";
    case "yellow":
      return "#ffaa00";
    default:
      return color;
  }
}

export function ColorBadge({ color }: { color: string }) {
  return (
    <div className="flex mr-2">
      <div
        className="rounded-full w-3 h-3 m-auto"
        style={{ backgroundColor: lightCSSColor(color) }}
      />
      <div className="w-1" />
      <div className="m-auto">
        {`${color.slice(0, 1).toLocaleUpperCase()}${color
          .slice(1)
          .toLocaleLowerCase()}`}
      </div>
    </div>
  );
}
