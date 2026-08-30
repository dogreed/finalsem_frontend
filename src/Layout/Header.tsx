export default function Header() {
  let fullName = "Admin";

  if (typeof window !== "undefined") {
    const userS = localStorage.getItem("userS");
    const userO = localStorage.getItem("userO");
    const userA = localStorage.getItem("userA");

    if (userS) {
      const parsedUserS = JSON.parse(userS);

      if (parsedUserS?.fullName) {
        fullName = parsedUserS.fullName;
      }
    } else if (userO) {
      const parsedUserO = JSON.parse(userO);

      if (parsedUserO?.fullName) {
        fullName = parsedUserO.fullName;
      }
    } else if (userA) {
      const parsedUserA = JSON.parse(userA);

      if (parsedUserA?.fullName) {
        fullName = parsedUserA.fullName;
      }
    }
  }

  return (
    <header className="flex h-16 w-full items-center justify-end border-b border-gray-100 bg-gray-50 px-6">
      <div className="flex items-center gap-6">
        <div className="flex cursor-pointer items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
            {fullName?.slice(0, 2).toUpperCase()}
          </div>

          <span className="font-medium text-gray-700">
            {fullName || "Admin"}
          </span>
        </div>
      </div>
    </header>
  );
}
