import { Task } from './task';


describe('tasks/', () => {
  describe('Task', () => {
    it('should set properties of a task', () => {
      expect(new Task('title', 'type', 'reason', 'products', 'conclusions').title).toBe('title');
    });

    it('should set completed to false by default', () => {
      expect(new Task('title', 'type', 'reason', 'products', 'conclusions').completed).toBe(false);
    });
  });
});
