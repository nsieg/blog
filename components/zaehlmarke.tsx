type Props = {
  id: string;
};

const Zaehlmarke = ({ id }: Props) => {
  return (
    <img
      src={"https://vg09.met.vgwort.de/na/" + id}
      width="1"
      height="1"
      alt=""
    ></img>
  );
};

export default Zaehlmarke;
