package OOPLand;

public class Hero extends AbstractHero {
    // data
    private int strength;

    // constructor
    public Hero(String name, int strength) {
        super(name);
        this.strength = strength;
    }

    public int getStrength() {
        return strength;
    }

    @Override
    public void attack() {
        System.out.println(name + " attacks with strength " + strength + "!");
    }
}

/*
 **** BEFORE ABSTRACTION

public class Hero {
    // Preperties (Data) - private fields (hidden from outside)
    private String name;
    private int strength;


    // Constructor : Builds a Hero with a name and strength
    public Hero(String name, int strength) {
        this.name = name;
        this.strength = strength;
    }

    // Getter for name 
    public String getName() {
        return name;
    }

    // Getter for strength
    public int getStrength() {
        return strength;
    }

    // Setter for strength
    public void setStrength(int strength) {
        if (strength > 0) {
            this.strength = strength;
        }
        else {
            System.out.println("Strength must be positive!");
        }
    }

    // Method : How the hero attacks
    public void attack() {
        System.out.println(name + " attacks with strength " + strength + " !");
    }
}
 */
