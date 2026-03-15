import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface StandingRow {
  pos: number;
  club: string;
  p: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  highlight?: boolean;
}

interface StandingsTableProps {
  data: StandingRow[];
  className?: string;
}

export const StandingsTable = ({ data, className }: StandingsTableProps) => {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-8 text-center text-[11px] font-semibold uppercase tracking-wider">#</TableHead>
            <TableHead className="text-[11px] font-semibold uppercase tracking-wider">Club</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">P</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">W</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">D</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">L</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">GF</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">GA</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-8">GD</TableHead>
            <TableHead className="text-center text-[11px] font-semibold uppercase tracking-wider w-10 text-primary">PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.pos}
              className={cn(
                "hover:bg-accent/50 transition-colors",
                row.highlight && "bg-primary/5 border-l-2 border-l-primary",
              )}
            >
              <TableCell className="text-center font-semibold text-xs tabular-nums">{row.pos}</TableCell>
              <TableCell className="font-medium text-sm">{row.club}</TableCell>
              <TableCell className="text-center text-xs tabular-nums text-muted-foreground">{row.p}</TableCell>
              <TableCell className="text-center text-xs tabular-nums text-primary font-medium">{row.w}</TableCell>
              <TableCell className="text-center text-xs tabular-nums text-muted-foreground">{row.d}</TableCell>
              <TableCell className="text-center text-xs tabular-nums text-destructive">{row.l}</TableCell>
              <TableCell className="text-center text-xs tabular-nums">{row.gf}</TableCell>
              <TableCell className="text-center text-xs tabular-nums">{row.ga}</TableCell>
              <TableCell className="text-center text-xs tabular-nums">{row.gd >= 0 ? `+${row.gd}` : row.gd}</TableCell>
              <TableCell className="text-center text-sm font-bold tabular-nums text-primary">{row.pts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
