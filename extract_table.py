import sys
import json
import tabula

def extract_tables(pdf_path):
    dfs = tabula.read_pdf(pdf_path, pages='all', multiple_tables=True)
    tables = [df.to_dict(orient='records') for df in dfs]
    return tables

if __name__ == '__main__':
    pdf_path = sys.argv[1]
    try:
        tables = extract_tables(pdf_path)
        sys.stdout.write(json.dumps(tables))  # Use sys.stdout.write to avoid extra newlines
    except Exception as e:
        sys.stderr.write(f"ERROR: {str(e)}\n")
        sys.exit(1)
