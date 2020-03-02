import Typed from "react-typed";

function typed() {
  const roles = ["Test1", "Test2", "Test3"];
  return (
    <div>
      <Typed
        loop
        typeSpeed={60}
        backSpeed={60}
        strings={roles}
        backDelay={1000}
        loopCount={0}
        showCursor
        className="self-typed"
        cursorChar="|"
      />
    </div>
  );
}

export default typed;
