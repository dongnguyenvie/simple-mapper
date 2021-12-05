import { Mapper } from './mapper';
import { ObjectToInstance } from './mapper/object-to-instance';

const mapper = new Mapper(new ObjectToInstance());

export { mapper };
