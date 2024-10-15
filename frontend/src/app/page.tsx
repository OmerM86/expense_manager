import Dashboard from '@/components/Dashboard';
import SideNavigation from '@/components/SideNavigation';

export default function Home() {
  return (
    <>
      <SideNavigation />
      <div className="mb-[160px] ml-[80px] mt-[60px] flex flex-col gap-[62px]">
        <Dashboard />
      </div>
    </>
  );
}
