export interface TableInfos {
  /**
   * The item id (you can use an another case)
   */
  _id: string;
  /**
   * The item index (you can use an another case)
   */
  index: number;
  /**
   * The object name of the person containing the first and the last name
   */
  name: object;
  /**
   * The group of the registered person
   */
  primary_group: string;
  /**
   * The phone number
   */
  phone: string;
  /**
   * The number of hours that person studied
   */
  hours_studied: number;
  /**
   * The person e-mail address
   */
  email: string;
}
