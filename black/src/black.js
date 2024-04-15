#include <stdio.h>

/**
 * @brief A function to print the ASCII value of a character.
 *
 * @param ch The character whose ASCII value is to be printed.
 */
void printAsciiValue(char ch) {
    printf("The ASCII value of '%c' is %d.\n", ch, (int)ch);
}

int main() {
    // Print the ASCII value of the character 'a'
    printAsciiValue('a');

    // Print the ASCII value of the character 'B'
    printAsciiValue('B');

    // Print the ASCII value of the character '1'
    printAsciiValue('1');

    return 0;
}
