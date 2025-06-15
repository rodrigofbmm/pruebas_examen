// routes/staff2/index.tsx
import { PageProps } from "$fresh/server.ts";
import StaffListIsla from "../../islands/StaffListIsla.tsx";

export default function StaffPageIsla(_props: PageProps) {
  return (
    <div className="container">
      <h1>Staff en la isla</h1>
      <StaffListIsla />
    </div>
  );
}
