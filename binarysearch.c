#include <stdio.h>
 
 
int main() {
   static int array[8]  = {1,5,9,13,85,101,113,151};
   static int array2[8] = {2,4,6,8,10,12,14,16};
   int find;
   printf("Enter value to find\n");
   scanf("%d", &find);
   int loc = search(array, find, 8);
   int fin = search(array2, find, 8);
   printf("%d  %d\n",loc,fin);
   return 0;
}

int search(int array[], int target, int n)
{
   int c, first, last, middle;
   static int final;
   first = 0;
   last = n - 1;
   middle = (first+last)/2;
   while (first <= last) {
      if (array[middle] < target)
         first = middle + 1;    
      else if (array[middle] == target) {
         final  = middle;
         break;
      }
      else
         last = middle - 1;
      middle = (first + last)/2;
   }
   if (first > last){ 
      final = first;
   }
   return final;   
}