import { useEffect } from "react";

export const RockList = ({ rocks, fetchRocks, mine }) => {
  useEffect(() => {
    fetchRocks();
  }, [mine]);

  const deleteRock = (id) => {
    fetch(`http://localhost:8000/rocks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
    }).then(() => fetchRocks());
  };

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          {rock.name} ({rock.type.label}) weighs {rock.weight} kg
          <br />
          In collection of {rock.user.first_name} {rock.user.last_name}
          <br />
          {mine ? (
            <button
              type="delete"
              onClick={() => deleteRock(rock.id)}
              className="button rounded-md bg-red-700 text-blue-100 p-2 mt-4"
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
