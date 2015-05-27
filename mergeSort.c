//
// gcc -fopenmp ompDemo.c
//
#include <stdio.h>
#include <omp.h>
#include <math.h>
#include <stdlib.h>
//
#define N 4
#define length 8
//
int* mergesort( int A[] , int B[] );
//
int arrayPrint(char *message, int array[] , int size)
{
   printf("\n%s\n",message);
   printf("[");
   for( int i = 0 ; i < size ; i++){
      printf(" %d ",array[i]);
   }
   printf("]\n");
}
//
int main( int argc , char* argv[] )
{
   int rank , size ;
   //
   omp_set_num_threads( N ) ;
   int *C;
   //
   int A[length] = {1,1,5,7,9,11,11,15};
   int B[length] = {2,3,3,3,10,12,45,55};
   arrayPrint("'A' Array", A , length);
   arrayPrint("'B' Array", B , length);
   C = mergesort(A, B);
   arrayPrint("'C' Array", C , length*2);
}

#include <stdio.h>
 
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

int* mergesort( int A[] , int B[] )
{
    printf("\n--- Merging A and B ---\n");
    static int C[length*2];
    int index;
    omp_set_num_threads( length ) ;
    #pragma omp parallel private(index)
    {
        index = omp_get_thread_num();
        index += search( B, A[index], length);
        C[index] = A[ omp_get_thread_num() ];
    }
    #pragma omp parallel private(index)
    {
        index = omp_get_thread_num();
        index += search( A, B[index], length);
        C[index] = B[ omp_get_thread_num() ];
    }
    return C;
}
//
// end of file
//