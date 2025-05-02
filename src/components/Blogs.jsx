import { Blog } from "../assets";

export default function Blogs() {
  return (
    <section>
      <div className="container mx-auto relative">
        <img src={Blog} alt="blogs" className="w-full" />
      </div>
    </section>
  );
}
