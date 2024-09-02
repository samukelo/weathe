import { Link } from "react-router-dom";
function Footer() {
  return (
    <section className="sectionlast">
      <div id="footer">
        <p className="left">
          <div className="flex lg:flex-1">
            <Link to="../" className="linkcolor" id>
              <h1 className="Logo">
                7 Day <span className="text-blue-400">Weather</span>
              </h1>
            </Link>
          </div>
        </p>
        
       
      </div>
    </section>
  );
}

export default Footer;
