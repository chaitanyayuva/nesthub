export function generateStaticParams() {
  return [{ id: '1' }];
}

export default function StudentPage({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Student Details</h1>
      <p className="text-slate-400">Student ID: {params.id}</p>
    </div>
  );
}
