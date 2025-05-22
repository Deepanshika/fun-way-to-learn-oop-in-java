package OOPLand;

public abstract class AbstractHero {
    protected String name;

    public AbstractHero(String name) {
        this.name = name;
    }

    public abstract void attack();

    public void sayHello() {
        System.out.println(name + " says: I'm ready to fight!");
    }
}
