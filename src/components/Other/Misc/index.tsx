const Misc = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-header-4 font-work">Misc</h1>
      <h2 className="text-body-1-bolder">Colors</h2>
      <hr />
      <div className="flex p-4">
        <div className="flex flex-col gap-4">
          <h3 className="text-body-2-bolder">fenrir Brand</h3>
          <h4 className="text-body-2-bold">Primary</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-g-primary-50"></div>

            <div className="w-10 h-10 bg-g-primary-100"></div>
            <div className="w-10 h-10 bg-g-primary-200"></div>
            <div className="w-10 h-10 bg-g-primary-300"></div>
            <div className="w-10 h-10 bg-g-primary-400"></div>
            <div className="w-10 h-10 bg-g-primary-500"></div>
          </div>
          <h4 className="text-body-2-bold">Secondary</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-g-secondary"></div>
          </div>
          <h4 className="text-body-2-bold">Accent</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-g-accent"></div>
            <div className="w-10 h-10 bg-g-accent-2"></div>
          </div>
          <h4 className="text-body-2-bold">Dark</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-g-dark-50"></div>
            <div className="w-10 h-10 bg-g-dark-100"></div>
            <div className="w-10 h-10 bg-g-dark-200"></div>
            <div className="w-10 h-10 bg-g-dark-300"></div>
            <div className="w-10 h-10 bg-g-dark-400"></div>
            <div className="w-10 h-10 bg-g-dark-500"></div>
          </div>
          <h4 className="text-body-2-bold">Light</h4>
          <div className="flex w-40 gap-4 p-4 bg-g-dark-500">
            <div className="w-10 h-10 bg-g-light-300"></div>
            <div className="w-10 h-10 bg-g-light-500"></div>
          </div>
          <h4 className="text-body-2-bold">Messages</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-g-success"></div>
            <div className="w-10 h-10 bg-g-error"></div>
            <div className="w-10 h-10 bg-g-warning"></div>
            <div className="w-10 h-10 bg-g-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Misc;
