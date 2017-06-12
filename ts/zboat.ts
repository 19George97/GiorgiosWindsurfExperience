

class zboat extends Obstacle {

constructor(name: string, image: string, vector: Vector){
    super(name, image, vector);
}

    public move() {
        this.position = this.position.add(this.speed);
    }


}