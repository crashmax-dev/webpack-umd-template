interface IUser {
  firstName: string
  lastName: string
  age: number
}

export class User {
  private firstName: string
  private lastName: string
  private age: number

  constructor({ firstName, lastName, age }: IUser) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`
  }

  isOverEighteen(): boolean {
    return this.age >= 18
  }
}