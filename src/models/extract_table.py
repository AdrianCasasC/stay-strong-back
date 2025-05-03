# extract_table.py
import sys
import json
import tabula

def extract_tables(pdf_path):
    # Extract tables from all pages
    dfs = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)
    # Convert DataFrames to list of dicts
    tables = [df.to_dict(orient='records') for df in dfs]
    return tables

if __name__ == '__main__':
    pdf_path = sys.argv[1]
    try:
        tables = extract_tables(pdf_path)
        print(json.dumps(tables))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)
