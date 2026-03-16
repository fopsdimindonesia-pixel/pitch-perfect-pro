import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '../context/MatchContext';
import { useRole } from '@/context/RoleContext';

export default function TacticalAnalysis() {
  const [activeTab, setActiveTab] = useState('formation');
  const { activeMatch } = useMatch();
  const { role } = useRole();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analisis Taktis</h1>
        <p className="text-muted-foreground mt-1">
          {activeMatch ? `${activeMatch.homeTeam} vs ${activeMatch.awayTeam}` : 'Pilih pertandingan untuk analisis'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Penguasaan Bola', value: '58%' },
          { label: 'Akurasi Passing', value: '82%' },
          { label: 'Tekanan Rata-rata', value: '7.8/10' },
          { label: 'Momentum', value: '↗', color: 'text-green-600' },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="pt-6">
              <div className={`text-2xl font-bold ${s.color || ''}`}>{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="formation">Formasi</TabsTrigger>
          <TabsTrigger value="pressure">Tekanan</TabsTrigger>
          <TabsTrigger value="passing">Passing</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="formation">
          <Card>
            <CardHeader><CardTitle>Analisis Formasi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{activeMatch?.homeTeam || 'Home'} - 4-3-3</h3>
                <p className="text-sm text-muted-foreground">
                  Formasi defensif dengan lini tengah seimbang mendukung sayap. Bek tengah mempertahankan lini tinggi.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{activeMatch?.awayTeam || 'Away'} - 4-2-3-1</h3>
                <p className="text-sm text-muted-foreground">
                  Setup defensif melindungi lini belakang dengan double pivot. Pressing terbatas di sepertiga serang.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pressure">
          <Card>
            <CardHeader><CardTitle>Peta Tekanan</CardTitle></CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-r from-green-500/50 via-yellow-500/50 to-red-500/50 rounded-lg" />
              <p className="text-xs text-muted-foreground mt-2">Visualisasi intensitas: Hijau (rendah) ke Merah (tinggi)</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passing">
          <Card>
            <CardHeader><CardTitle>Jaringan Passing</CardTitle></CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg" />
              <p className="text-xs text-muted-foreground mt-2">Koneksi pemain menunjukkan pola passing</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader><CardTitle>Heatmap Aktivitas</CardTitle></CardHeader>
            <CardContent>
              <div className="w-full h-64 bg-gradient-to-b from-amber-100/50 via-orange-300/50 to-red-400/50 rounded-lg" />
              <p className="text-xs text-muted-foreground mt-2">Densitas aktivitas pemain di lapangan</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader><CardTitle>Insight Taktis</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-primary/5 border-l-4 border-primary rounded">
            <Badge className="mb-2 bg-primary/10 text-primary">Penguasaan</Badge>
            <p className="text-sm">Tim tuan rumah mendominasi penguasaan bola 58%, mengontrol tempo permainan</p>
          </div>
          <div className="p-3 bg-green-500/5 border-l-4 border-green-500 rounded">
            <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Efisiensi</Badge>
            <p className="text-sm">Akurasi passing 82% menunjukkan kontrol bola dan distribusi yang presisi</p>
          </div>
          <div className="p-3 bg-amber-500/5 border-l-4 border-amber-500 rounded">
            <Badge className="mb-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Kerentanan</Badge>
            <p className="text-sm">Tim tamu mengeksploitasi transisi defensif, mencetak gol melalui serangan balik</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
