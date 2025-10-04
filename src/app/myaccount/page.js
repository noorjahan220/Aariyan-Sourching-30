import { Suspense } from "react";
import MyAccount from "../../../Pages/MyAccount/MyAccount";
import LoadingSpinner from "../../../components/LoadingSpinner";

const page = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <MyAccount />
      </Suspense>
    </div>
  );
};

export default page;