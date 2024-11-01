import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

describe('LocationsComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ListComponent],
        declarations: [ListComponent],
      }).compileComponents();
  
      fixture = TestBed.createComponent(ListComponent);
      component = fixture.componentInstance;
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should be "TO-DO LIST" the title', () => {
        const title = fixture.debugElement.query(By.css('#list-header')).nativeElement;
        expect(title.textContent).toEqual('TO-DO LIST');
    });

    it('should add an item to the to-do list', () => {
        const testItem = 'Test To-Do Item';
        const inputElement = fixture.nativeElement.querySelector('input');
        const addButton = fixture.nativeElement.querySelector('button');
        inputElement.value = testItem;
        addButton.click();
        fixture.detectChanges();
        const todoItemsList = fixture.nativeElement.querySelectorAll('.todo-item');
        const itemTexts = Array.from(todoItemsList).map((item: HTMLElement) => item.textContent);

        expect(itemTexts).toContain(testItem);
    });

    it('should remove an item from the to-do list', () => {
        const testItem = 'Test To-Do Item';
        const inputElement = fixture.nativeElement.querySelector('input');
        const addButton = fixture.nativeElement.querySelector('button');
        inputElement.value = testItem;
        addButton.click();
        fixture.detectChanges();
        let todoItems = fixture.nativeElement.querySelectorAll('.todo-item');
        let itemTexts = Array.from(todoItems).map((item: HTMLElement) => item.textContent);

        expect(itemTexts).toContain(testItem);

        const removeButton = fixture.nativeElement.querySelector('.remove-button');
        removeButton.click();
        fixture.detectChanges();
        todoItems = fixture.nativeElement.querySelectorAll('.todo-item');
        itemTexts = Array.from(todoItems).map((item: HTMLElement) => item.textContent);

        expect(itemTexts).not.toContain(testItem);
    });

    it('should mark an item as complete', () => {
        const testItem = 'Test To-Do Item';
        const inputElement = fixture.nativeElement.querySelector('input');
        const addButton = fixture.nativeElement.querySelector('button');
        inputElement.value = testItem;
        addButton.click();
        fixture.detectChanges();
        const todoItems = fixture.nativeElement.querySelectorAll('.todo-item');
        const itemTexts = Array.from(todoItems).map((item: HTMLElement) => item.textContent);

        expect(itemTexts).toContain(testItem);

        const markCompleteButton = todoItems[0].querySelector('.complete-button');
        markCompleteButton.click();
        fixture.detectChanges();
        const firstItemCheckbox = todoItems[0].querySelector('.item-checkbox') as HTMLInputElement;

        expect(firstItemCheckbox.checked).toEqual(true);

        markCompleteButton.click();
        fixture.detectChanges();
        
        expect(firstItemCheckbox.checked).toEqual(false);
    });

    it('should not add item to list if input is empty', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        const addButton = fixture.nativeElement.querySelector('button');
        inputElement.value = '';
        addButton.click();
        fixture.detectChanges();
        const todoItems = fixture.nativeElement.querySelectorAll('.todo-item');

        expect(todoItems.length).toEqual(0);
    });
});