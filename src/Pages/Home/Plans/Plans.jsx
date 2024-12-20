const Plans = () => {
  return (
    <>
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Subscription title!</h2>
          <p>Free Plan</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary w-full rounded-full">
              Try free for 1 month
            </button>
          </div>
        </div>
      </div>
      {/* Premium */}
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Subscription title!</h2>
          <p>14.25$</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-warning w-full rounded-full">
              Get Premium Duo
            </button>
          </div>
        </div>
      </div>
      {/* Ultra Premium */}
      <div className="card w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Subscription title!</h2>
          <p>16.99$</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-error text-white w-full rounded-full">
              Get Premium Family
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
