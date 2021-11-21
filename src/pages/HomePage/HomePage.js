import s from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={s.page}>
      <h1 className={s.title}>"Magic phonebook"</h1>
      <p className={s.text}>
        First you need to register. If you already have an account, go through
        the authentication. Your phonebook gives you the ability to add new
        contacts, edit existing ones and delete contacts you don't need.
      </p>
    </div>
  );
}

export default HomePage;
