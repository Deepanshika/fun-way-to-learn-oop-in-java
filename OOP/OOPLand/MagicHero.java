package OOPLand;

public class MagicHero extends AbstractHero {
    private int strength;
    private int magicPower;

    public MagicHero(String name, int strength, int magicPower) {
        super(name); 
        this.strength = strength;
        this.magicPower = magicPower;
    }

    @Override
    public void attack() {
        System.out.println(name + " attacks with strength " + getStrength() + " and magic power " + magicPower + "!");
    }

    public void castSpell() {
        System.out.println(name + " casts a powerful spell with magic power " + magicPower + " !");
    }

    public int getStrength() {
        return strength;
    }
}
