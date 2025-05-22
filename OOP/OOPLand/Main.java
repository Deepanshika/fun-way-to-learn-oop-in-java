package OOPLand;

public class Main {
    public static void main(String[] args) {
        // Team of Heroes
        AbstractHero[] team = {
            new Hero("Max", 50),
            new Hero("Luna", 60),
            new MagicHero("Ella", 45  , 100),
            new RobotHero("Bolt", 60, 120),
        };

        for (AbstractHero hero : team) {
            hero.sayHello();
            hero.attack();
            System.out.println();
        }

        System.out.println("Together, they defeated the Bug King 🐞👑 and saved OOPLand!");
    }
}
