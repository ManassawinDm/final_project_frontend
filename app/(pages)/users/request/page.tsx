import MergeAll from "@/components/User/Request/MergeAll";

const UserRequest = () => {
  return (
    <div className="min-h-screen h-auto flex justify-center py-8">
      <div className="bg-white w-[98%] rounded-xl shadow-lg overflow-hidden ">
          <div className="p-8">
            <MergeAll />
          </div>
      </div>
    </div>
  );
};

export default UserRequest;
