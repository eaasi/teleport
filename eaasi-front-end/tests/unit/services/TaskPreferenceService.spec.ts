import TaskPreferenceService from '@/services/TaskPreferenceService';

declare var global: any;

describe('TaskPreferenceService', () => {

    beforeEach(() => {
		jest.spyOn(window.localStorage.__proto__, 'setItem');
		window.localStorage.__proto__.setItem = jest.fn();
    });

    describe('persistTaskClosePreference', () => {        
      it('it should persist task close preference', () => {
          const closed = true;
          const svc = new TaskPreferenceService();
          svc.persistTaskClosePreference(closed);

          expect(localStorage.setItem).toHaveBeenCalledWith('TASK_RUNNER_CLOSED', JSON.stringify(closed));
        });
    });

    describe('persistTaskCollapsePreference', () => {
      it('it should persist task collapses preference', () => {
          const collapsed = true;
          const svc = new TaskPreferenceService();
		  svc.persistTaskCollapsePreference(collapsed);
		  
		  expect(localStorage.setItem).toHaveBeenCalledWith('TASK_RUNNER_COLLAPSED', JSON.stringify(collapsed));
        });
    });

});
