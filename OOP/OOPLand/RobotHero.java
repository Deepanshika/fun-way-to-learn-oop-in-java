package OOPLand;

public class RobotHero extends AbstractHero {
    private int strength;
    private int laserPower;

    public RobotHero(String name, int strength, int laserPower) {
        super(name);
        this.strength = strength;
        this.laserPower = laserPower;
    }

    @Override
    public void attack() {
        System.out.println(name + " fires laser with power " + laserPower + " and strength " + getStrength() + "!");
    }

    public int getStrength() {
        return strength;
    }
}
