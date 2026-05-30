export function generateStaticParams() {
  return [{ id: '1' }];
}

export default function RoomPage({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Room Details</h1>
      <p className="text-slate-400">Room ID: {params.id}</p>
    </div>
  );
}
